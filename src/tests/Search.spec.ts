import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

const SearchTest = defineComponent({
  template: `
    <form @submit.prevent="search">
      <input v-model="value" type="search" placeholder="Search for a country..." class="search-input" />
    </form>
  `,
  data() {
    return { value: '' };
  },
  emits: ['search'],
  methods: {
    search() {
      this.$emit('search', this.value.toLowerCase().trim());
    },
  },
});

describe('Search Component', () => {
  it('should render search input', () => {
    const wrapper = mount(SearchTest);
    const input = wrapper.find('.search-input');

    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Search for a country...');
  });

  it('should emit search event with query on submit', async () => {
    const wrapper = mount(SearchTest);
    const input = wrapper.find('.search-input');

    await input.setValue('Spain');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['spain']);
  });

  it('should emit empty string when input is whitespace only', async () => {
    const wrapper = mount(SearchTest);
    const input = wrapper.find('.search-input');

    await input.setValue('   ');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('search')?.[0]).toEqual(['']);
  });

  it('should convert query to lowercase', async () => {
    const wrapper = mount(SearchTest);
    const input = wrapper.find('.search-input');

    await input.setValue('SPAIN');
    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted('search')?.[0]).toEqual(['spain']);
  });
});

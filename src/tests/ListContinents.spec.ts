import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

const ListContinentsTest = defineComponent({
  template: `
    <div>
      <button @click="toggle" class="toggle-btn">
        {{ selected || 'Filter by Region' }}
      </button>
      <ul v-if="isOpen" class="dropdown">
        <li v-for="continent in continents" :key="continent" @click="selectContinent(continent)" class="continent-item">
          {{ continent }}
        </li>
      </ul>
    </div>
  `,
  data() {
    return {
      isOpen: false,
      selected: '',
      continents: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
    };
  },
  emits: ['select'],
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    selectContinent(continent: string) {
      this.selected = continent;
      this.$emit('select', continent);
      this.isOpen = false;
    },
  },
});

describe('ListContinents Component', () => {
  it('should show Filter by Region by default', () => {
    const wrapper = mount(ListContinentsTest);
    expect(wrapper.text()).toContain('Filter by Region');
  });

  it('should show dropdown when toggled', async () => {
    const wrapper = mount(ListContinentsTest);

    await wrapper.find('.toggle-btn').trigger('click');

    expect(wrapper.find('.dropdown').exists()).toBe(true);
  });

  it('should have 5 continents in dropdown', async () => {
    const wrapper = mount(ListContinentsTest);

    await wrapper.find('.toggle-btn').trigger('click');

    const items = wrapper.findAll('.continent-item');
    expect(items).toHaveLength(5);
  });

  it('should emit select event when continent clicked', async () => {
    const wrapper = mount(ListContinentsTest);

    await wrapper.find('.toggle-btn').trigger('click');
    await wrapper.find('.continent-item').trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')?.[0]).toEqual(['Africa']);
  });

  it('should close dropdown after selecting continent', async () => {
    const wrapper = mount(ListContinentsTest);

    await wrapper.find('.toggle-btn').trigger('click');
    await wrapper.find('.continent-item').trigger('click');

    expect(wrapper.find('.dropdown').exists()).toBe(false);
  });

  it('should show selected continent in button text', async () => {
    const wrapper = mount(ListContinentsTest);

    await wrapper.find('.toggle-btn').trigger('click');
    await wrapper.find('.continent-item').trigger('click');

    expect(wrapper.text()).toContain('Africa');
  });
});

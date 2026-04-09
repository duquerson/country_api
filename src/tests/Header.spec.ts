import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

const HeaderTest = defineComponent({
  template: `
    <header class="bg-white dark:bg-menu-color-dark h-[130px]">
      <nav class="flex justify-between">
        <h1><a href="/">Where in the world?</a></h1>
        <button @click="toggleMode" class="mode-toggle">
          {{ mode ? 'light Mode' : 'Dark Mode' }}
        </button>
      </nav>
    </header>
  `,
  data() {
    return { mode: false };
  },
  methods: {
    toggleMode() {
      this.mode = !this.mode;
    },
  },
});

describe('Header Component', () => {
  it('should render the title', () => {
    const wrapper = mount(HeaderTest);
    expect(wrapper.text()).toContain('Where in the world?');
  });

  it('should show Dark Mode by default', () => {
    const wrapper = mount(HeaderTest);
    expect(wrapper.text()).toContain('Dark Mode');
  });

  it('should toggle to light Mode when button clicked', async () => {
    const wrapper = mount(HeaderTest);
    const button = wrapper.find('.mode-toggle');

    await button.trigger('click');

    expect(wrapper.text()).toContain('light Mode');
  });

  it('should toggle back to Dark Mode when clicked again', async () => {
    const wrapper = mount(HeaderTest);
    const button = wrapper.find('.mode-toggle');

    await button.trigger('click');
    await button.trigger('click');

    expect(wrapper.text()).toContain('Dark Mode');
  });
});

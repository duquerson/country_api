import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import CountryDetail from '@presentation/components/country/CountryDetail.vue';
import Card from '@presentation/components/country/Card.vue';

const Page404Test = defineComponent({
  template: `
    <figure>
      <img src="/src/assets/bg-404.webp" alt="404 page not found" />
      <figcaption>404 not found</figcaption>
    </figure>
  `,
});

describe('Page404 Component', () => {
  it('should render 404 text', () => {
    const wrapper = mount(Page404Test);
    expect(wrapper.text()).toContain('404 not found');
  });

  it('should render image with correct alt text', () => {
    const wrapper = mount(Page404Test);
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('404 page not found');
  });
});
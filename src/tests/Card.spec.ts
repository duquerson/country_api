import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '@presentation/components/country/Card.vue';

import { getMockCountries } from './fixtures/mockData';
import type { CountrySummary } from '@core/domain/types';

describe('Card Component (v5)', () => {
  let mockCountry: CountrySummary;

  beforeAll(() => {
    const countries = getMockCountries();
    const colombia = countries.find((c) => c.codes.alpha_3 === 'COL');
    if (!colombia) throw new Error('Colombia not found in mock data');

    // Convertir Country a CountrySummary
    mockCountry = {
      codes: { alpha_3: colombia.codes.alpha_3 },
      names: { common: colombia.names.common },
      capitals: colombia.capitals,
      region: colombia.region,
      population: colombia.population,
      flag: { url_svg: colombia.flag.url_svg, emoji: colombia.flag.emoji },
    };
  });

  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders country name (v5: names.common)', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain(mockCountry.names.common);
  });

  it('renders formatted population', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain(new Intl.NumberFormat('en-US').format(mockCountry.population));
  });

  it('renders region', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain('Americas');
  });

  it('renders capital (v5: capitals[0].name)', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain('Bogotá');
  });

  it('has correct detail link with country alpha_3 code lowercase', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/detail/col');
  });

  it('shows None when capitals is empty', () => {
    const countryWithoutCapital: CountrySummary = { ...mockCountry, capitals: [] };
    const wrapper = mount(Card, {
      props: { country: countryWithoutCapital },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain('None');
  });
});

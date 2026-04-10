import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '@presentation/components/Card.vue';

import { getMockCountries } from './fixtures/mockData';
import type { CountrySummary } from '@core/domain/types';

describe('Card Component', () => {
  let mockCountry: CountrySummary;

  beforeAll(() => {
    // Buscar Colombia en el mock
    const countries = getMockCountries();
    const colombia = countries.find((c: any) => c.cca3 === 'COL');
    if (!colombia) throw new Error('Colombia not found in mock data');
    
    mockCountry = {
      cca3: colombia.cca3,
      name: { common: colombia.name.common },
      capital: colombia.capital,
      region: colombia.region,
      population: colombia.population,
      flags: colombia.flags,
    };
  });

  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders country name', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain(mockCountry.name.common);
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

  it('renders capital', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain('Bogotá');
  });

  it('has correct detail link with country code', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/detail/col');
  });

  it('shows N/A when capital is missing', () => {
    const countryWithoutCapital = { ...mockCountry, capital: [] };
    const wrapper = mount(Card, {
      props: { country: countryWithoutCapital },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain('None');
  });
});

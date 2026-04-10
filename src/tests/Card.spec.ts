import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '@presentation/components/Card.vue';

import { getMockCountries } from './fixtures/mockData';
import type { CountrySummary } from '@core/domain/Country';

describe('Card Component', () => {
  let mockCountry: CountrySummary;

  beforeAll(() => {
    // Buscar España en el mock
    const countries = getMockCountries();
    const spain = countries.find((c: any) => c.cca3 === 'ESP' || c.name.common === 'Spain');
    mockCountry = {
      cca3: spain.cca3,
      common: spain.name.common,
      capital: spain.capital,
      region: spain.region,
      population: spain.population,
      flags: spain.flags,
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
    expect(wrapper.text()).toContain(mockCountry.common);
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
    expect(wrapper.text()).toContain('Europe');
  });

  it('renders capital', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    expect(wrapper.text()).toContain('Madrid');
  });

  it('has correct detail link with country code', () => {
    const wrapper = mount(Card, {
      props: { country: mockCountry },
      global: { stubs: { ImageLazy: { template: '<div></div>' } } }
    });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/detail/esp');
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

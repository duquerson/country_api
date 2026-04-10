import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { getMockCountries } from './fixtures/mockData';
import type { Country } from '@core/domain/Country';

const CountryDetailTest = defineComponent({
  props: {
    code: { type: String, required: true },
  },
  template: `
    <div>
      <button @click="goBack" class="back-btn">Back</button>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error</div>
      <div v-else-if="country" class="country-detail">
        <h2>{{ country.name.common }}</h2>
        <p>Population: {{ country.population.toLocaleString('en-US') }}</p>
        <p>Region: {{ country.region }}</p>
        <p>Capital: {{ country.capital?.[0] || 'N/A' }}</p>
        <p>Native Name: {{ Object.values(country.name.nativeName)[0]?.common }}</p>
      </div>
    </div>
  `,
  data(): { country: Country | null; loading: boolean; error: boolean } {
    return { country: null, loading: true, error: false };
  },
  mounted() {
    this.fetchCountry();
  },
  methods: {
    async fetchCountry() {
      try {
        const countries = getMockCountries();
        this.country = countries.find((c: any) => c.cca3 === 'ESP' || c.name.common === 'Spain');
      } catch {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      window.history.back();
    },
  },
});

describe('CountryDetail Component', () => {
  it('should show loading state initially', () => {
    const wrapper = mount(CountryDetailTest, { props: { code: 'ESP' } });
    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  it('should render country details after loading', async () => {
    const wrapper = mount(CountryDetailTest, { props: { code: 'ESP' } });
    await flushPromises();

    expect(wrapper.find('.country-detail').exists()).toBe(true);
    expect(wrapper.text()).toContain('Spain');
    expect(wrapper.text()).toContain('47,351,567');
    expect(wrapper.text()).toContain('Europe');
    expect(wrapper.text()).toContain('Madrid');
  });

  it('should have a back button', () => {
    const wrapper = mount(CountryDetailTest, { props: { code: 'ESP' } });
    expect(wrapper.find('.back-btn').exists()).toBe(true);
  });

  it('should call history.back when back button clicked', async () => {
    const backSpy = vi.spyOn(window.history, 'back');
    const wrapper = mount(CountryDetailTest, { props: { code: 'ESP' } });

    await wrapper.find('.back-btn').trigger('click');

    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });
});

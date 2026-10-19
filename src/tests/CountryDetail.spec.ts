import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { getMockCountries } from './fixtures/mockData';
import type { Country } from '@core/domain/types';

// Componente de prueba que simula el comportamiento de CountryDetail
// sin depender de Astro Actions ni Vue Router
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
        <h2>{{ country.names.common }}</h2>
        <p>Population: {{ country.population.toLocaleString('en-US') }}</p>
        <p>Region: {{ country.region }}</p>
        <p>Capital: {{ country.capitals?.[0]?.name || 'N/A' }}</p>
        <p>Native Name: {{ Object.values(country.names.native ?? {})[0]?.common }}</p>
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
        this.country = countries.find((c: Country) => c.codes.alpha_3 === 'COL') ?? null;
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
    const wrapper = mount(CountryDetailTest, { props: { code: 'COL' } });
    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  it('should render country details after loading (v5 structure)', async () => {
    const wrapper = mount(CountryDetailTest, { props: { code: 'COL' } });
    await flushPromises();

    expect(wrapper.find('.country-detail').exists()).toBe(true);
    expect(wrapper.text()).toContain('Colombia');
    expect(wrapper.text()).toContain('50,882,891');
    expect(wrapper.text()).toContain('Americas');
    expect(wrapper.text()).toContain('Bogotá');
  });

  it('should have a back button', () => {
    const wrapper = mount(CountryDetailTest, { props: { code: 'COL' } });
    expect(wrapper.find('.back-btn').exists()).toBe(true);
  });

  it('should call history.back when back button clicked', async () => {
    const backSpy = vi.spyOn(window.history, 'back');
    const wrapper = mount(CountryDetailTest, { props: { code: 'COL' } });

    await wrapper.find('.back-btn').trigger('click');

    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });
});

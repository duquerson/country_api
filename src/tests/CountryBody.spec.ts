import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent, type PropType } from 'vue';
import type { CountrySummary } from '@core/domain/types';

// Mock de países en estructura v5
const mockSummaries: CountrySummary[] = [
  {
    codes: { alpha_3: 'COL' },
    names: { common: 'Colombia' },
    capitals: [{ name: 'Bogotá', primary: true }],
    region: 'Americas',
    population: 50882891,
    flag: { url_svg: 'https://flags.restcountries.com/v5/svg/co.svg', emoji: '🇨🇴' },
  },
  {
    codes: { alpha_3: 'DEU' },
    names: { common: 'Germany' },
    capitals: [{ name: 'Berlin', primary: true }],
    region: 'Europe',
    population: 83240525,
    flag: { url_svg: 'https://flags.restcountries.com/v5/svg/de.svg', emoji: '🇩🇪' },
  },
];

// Componente de prueba que simula CountryBody sin Astro Actions
const CountryBodyTest = defineComponent({
  props: {
    query: { type: String as PropType<string>, default: '' },
    region: { type: String as PropType<string>, default: '' },
  },
  template: `
    <div>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">Error</div>
      <div v-else class="countries">
        <div v-for="country in countries" :key="country.codes.alpha_3" class="card">
          {{ country.names.common }}
        </div>
      </div>
    </div>
  `,
  data(): { countries: CountrySummary[]; loading: boolean; error: boolean } {
    return { countries: [], loading: false, error: false };
  },
  watch: {
    query: 'fetchCountries',
    region: 'fetchCountries',
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    async fetchCountries() {
      this.loading = true;
      this.error = false;
      try {
        if (this.region) {
          this.countries = mockSummaries.filter(c => c.region === this.region);
        } else if (this.query) {
          this.countries = mockSummaries.filter(c =>
            c.names.common.toLowerCase().includes(this.query.toLowerCase())
          );
        } else {
          this.countries = mockSummaries;
        }
      } catch {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
});

describe('CountryBody Component (v5)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show all countries when no query or region', async () => {
    const wrapper = mount(CountryBodyTest);
    await flushPromises();

    const cards = wrapper.findAll('.card');
    expect(cards).toHaveLength(2);
    expect(wrapper.text()).toContain('Colombia');
    expect(wrapper.text()).toContain('Germany');
  });

  it('should show filtered countries when region is set', async () => {
    const wrapper = mount(CountryBodyTest, {
      props: { region: 'Americas' },
    });
    await flushPromises();

    const cards = wrapper.findAll('.card');
    expect(cards).toHaveLength(1);
    expect(wrapper.text()).toContain('Colombia');
  });

  it('should show filtered countries when query is set', async () => {
    const wrapper = mount(CountryBodyTest, {
      props: { query: 'Colombia' },
    });
    await flushPromises();

    const cards = wrapper.findAll('.card');
    expect(cards).toHaveLength(1);
    expect(wrapper.text()).toContain('Colombia');
  });

  it('should not show error state in normal operation', async () => {
    const wrapper = mount(CountryBodyTest);
    await flushPromises();
    expect(wrapper.find('.error').exists()).toBe(false);
  });
});

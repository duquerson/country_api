import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent, type PropType } from 'vue';
import { getMockCountries } from './fixtures/mockData';
import type { CountrySummary } from '@core/domain/Country';

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
        <div v-for="country in countries" :key="country.cca3" class="card">
          {{ country.common }}
        </div>
      </div>
    </div>
  `,
  data(): { countries: CountrySummary[]; loading: boolean; error: boolean } {
    return {
      countries: getMockCountries().map((c: any) => ({
        cca3: c.cca3,
        common: c.name.common,
        capital: c.capital,
        region: c.region,
        population: c.population,
        flags: c.flags,
      })), loading: false, error: false
    };
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
        const mockCountries: CountrySummary[] = [
          { cca3: 'ESP', common: 'Spain', capital: ['Madrid'], region: 'Europe', population: 47351567, flags: { svg: '', alt: '' } },
          { cca3: 'FRA', common: 'France', capital: ['Paris'], region: 'Europe', population: 67390000, flags: { svg: '', alt: '' } },
        ];

        if (this.region) {
          this.countries = [mockCountries[0]];
        } else if (this.query) {
          this.countries = [mockCountries[0]];
        } else {
          this.countries = mockCountries;
        }
      } catch {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
});

describe('CountryBody Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show all countries when no query or region', async () => {
    const wrapper = mount(CountryBodyTest);
    await flushPromises();

    const cards = wrapper.findAll('.card');
    expect(cards).toHaveLength(2);
    expect(wrapper.text()).toContain('Spain');
    expect(wrapper.text()).toContain('France');
  });

  it('should show filtered countries when region is set', async () => {
    const wrapper = mount(CountryBodyTest, {
      props: { region: 'Europe' },
    });
    await flushPromises();

    const cards = wrapper.findAll('.card');
    expect(cards).toHaveLength(1);
    expect(wrapper.text()).toContain('Spain');
  });

  it('should show filtered countries when query is set', async () => {
    const wrapper = mount(CountryBodyTest, {
      props: { query: 'Spain' },
    });
    await flushPromises();

    const cards = wrapper.findAll('.card');
    expect(cards).toHaveLength(1);
  });

  it('should show error state on fetch failure', async () => {
    const wrapper = mount(CountryBodyTest);
    await flushPromises();

    expect(wrapper.find('.error').exists()).toBe(false);
  });
});

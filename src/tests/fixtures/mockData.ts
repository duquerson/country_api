// Helper para cargar datos reales de _archive/data.json
import fs from 'fs';
import path from 'path';

// Mapea el JSON real al formato CountrySummary y Country del dominio
export function getMockCountries() {
    const filePath = path.resolve(__dirname, '../../../_archive/data.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    // Mapear cada país al formato esperado por Country
    return data.map((item: any) => ({
        cca3: item.alpha3Code || item.cca3 || item.cioc,
        cca2: item.alpha2Code || item.cca2,
        name: {
            common: item.name,
            official: item.translations?.es || item.name,
            nativeName: {
                // Solo un idioma principal
                [item.languages?.[0]?.iso639_2 || 'und']: {
                    common: item.languages?.[0]?.nativeName || item.nativeName || item.name,
                    official: item.translations?.es || item.name
                }
            }
        },
        capital: item.capital ? [item.capital] : [],
        region: item.region,
        subregion: item.subregion,
        population: item.population,
        flags: {
            svg: item.flags?.svg || item.flag,
            png: item.flags?.png,
            alt: undefined
        },
        tld: item.topLevelDomain || [],
        currencies: item.currencies ? Object.fromEntries(item.currencies.map((c: any) => [c.code, { name: c.name, symbol: c.symbol }])) : {},
        languages: item.languages ? Object.fromEntries(item.languages.map((l: any) => [l.iso639_2, l.name])) : {},
        borders: item.borders || [],
        continents: [],
        timezones: item.timezones || [],
    }));
}

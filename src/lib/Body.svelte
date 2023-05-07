<script>
    import Header from './Header.svelte';
    import Details from './Details.svelte';
    const API = 'https://restcountries.com/v3.1/';
    import axios from 'axios';
    import Image from './ImageLazzy.svelte';
    import { onMount } from 'svelte';
    let initCountries = ['Germany', 'United States of America', 'Brasil', 'Iceland', 'Afghanistan', 'Åland Islands', 'Albania', 'Algeria' ];
    let detailCountries = [];
    let click = false;
    let country = {};
    const initView = async ()=>{
            const countries = initCountries.map(async (country)=> {
                const {data} = await axios(`${API}name/${country}`);
                return {
                    flag: data[0].flags.png,
                    name: data[0].name.common,
                    native: data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common,
                    population: data[0].population.toLocaleString('en-US'),
                    region: data[0].region,
                    subregion: data[0].subregion,
                    capital: data[0].capital[0],
                    top: data[0].tld[0],
                    currencies: data[0].currencies[Object.keys(data[0].currencies)[0]].name,
                    lang: Object.values(data[0].languages).toString(),
                    border: data[0].borders,
                };
            });
        detailCountries = await Promise.all(countries);
    };
    const dato = (event)=>{
        const selectView = event.detail;
        detailCountries = selectView.map(items =>{
            return {
                flag: items.flags.png,
                name: items.name.common,
                native: items.name.nativeName[Object.keys(items.name.nativeName)[0]].common,
                population: items.population.toLocaleString('en-US'),
                region: items.region,
                subregion: items.subregion,
                capital: items.capital,
                top: items.tld,
                currencies: items.currencies[Object.keys(items.currencies)[0]].name,
                lang: Object.values(items.languages).toString(),
                border: items.borders,
            }
        });
    };
    onMount(initView);
    const handleDetails = (countryDetails)=>{
        click = !click;
        country = countryDetails;
    };
    const backHistory= (event)=>{
        click = event.detail;
    }
</script>
<div class="container dark:bg-$color-dark ">
    {#if click}
        <Details on:home={backHistory} {country}/>
    {:else}
        <div class="component1 ">
            <Header on:selectcontinent={dato}/>
        </div>
        
        {#await detailCountries}
            <div class="component2 w-screen h-full grid grid-cols-1 grid-rows-8 lg:grid-cols-4 lg:grid-rows-2 lg:gap-8 justify-items-center gap-12 pt-3 bg-opacity-5 dark:bg-color-dark dark:text-text-color-dark animate-pulse bg-gray-200 shadow-2xl"></div>
        {:then data}
            <div class="component2 w-screen grid grid-cols-1 grid-rows-8 lg:grid-cols-4 lg:grid-rows-2 lg:gap-8 justify-items-center gap-12 pt-3 bg-color-light bg-opacity-5 dark:bg-color-dark dark:text-text-color-dark">
                {#each data as country}
                    <section class=" h-[560px] w-[348px] mx-4 mb-4 rounded-lg shadow-lg dark:bg-menu-color-dark">
                        <button on:click={()=>handleDetails(country)}>
                            <Image countryFlag={country.flag} countryName={country.name}></Image>
                            <div class="mx-7 mt-12">
                                <h2 class="mb-4 font-bold text-2xl">{country.name}</h2>
                                <div class="text-lg mt-8">
                                    <p class="mb-2"><span class="font-semibold">Population:</span> {country.population}</p>
                                    <p class="mb-2"><span class="font-semibold">Region:</span> {country.region}</p>
                                    <p class="mb-2"><span class="font-semibold">Capital:</span> {country.capital}</p>
                                </div>
                            </div>
                        </button>
                    </section>
                {/each}
            </div>
        {:catch error}
            <p>Error: {error.message}</p>
        {/await}
    {/if}
</div>

<style>
    .container{
        position: absolute;
        top: 140px;
        left: 0;
        right: 0;
        z-index: 0;
    }
    .component1{
        position: relative;
        z-index: 2;
    }
    .component2{
        position: relative;
        z-index: 1;
    }
</style>

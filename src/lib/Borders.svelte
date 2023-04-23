<script>
    import {createEventDispatcher, onMount} from 'svelte';
    const API = 'https://restcountries.com/v3.1/';
    import axios from 'axios';
    export let country = {};
    let countryBorder;
    const dispatch = createEventDispatcher();
    let border = [];
    const borderCountry = async()=>{
        try {
                countryBorder = country.border;
                for (const country of countryBorder) {
                    const {data} = await axios(`${API}alpha/${country}`);
                    let dataCountry = {
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
                    border = [...border, dataCountry];
                }
                
            } catch (error) {
                console.log(error);
            }
    };
    const detailCountryBorder = (Country)=>{
        border = [];
        country = Country;
        borderCountry();
        dispatch('updata', Country);
    };
    
    onMount(borderCountry);
</script>

<div class="flex flex-wrap ml-10 mt-3 mb-3 gap-2 lg:mt-0 lg:mb-6">
    {#each border as country}
        <button on:click={()=>detailCountryBorder(country)} class="flex w-[110px] h-[35px] text-xs items-center justify-center bg-white dark:bg-menu-color-dark dark:text-text-color-dark rounded-xs shadow-2xl ">{country.name}</button>
    {/each}
</div>
<script>
    import {createEventDispatcher} from 'svelte';
    import Borders from './Borders.svelte';
    export let country = {};
    let click = false;
    const dispatch = createEventDispatcher();
    const backhistory = ()=>{
        dispatch('home', click);
    }
    const updateCountry = (event)=>{
        country = event.detail;
    };

</script>
<section class="bg-color-light bg-opacity-5 pt-10 dark:bg-color-dark dark:text-text-color-dark w-screen h-full">
    <button on:click={backhistory} class="flex w-[110px] ml-8 h-[34px] mb-[70px] align-baseline items-center justify-center bg-white dark:bg-menu-color-dark dark:text-text-color-dark  font-medium rounded-xs shadow-black shadow-2xl ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
    </button>
    <div class=" h-full w-screen lg:flex  lg:px-8">
        <figure class="flex flex-col items-center lg:justify-top lg:mt-8">
            <img src={country.flag} alt={`Flag of ${country.name}`}>
        </figure>
        <div class="flex flex-col mx-10 ">
            <h2 class="text-2xl font-bold mb-6 mt-[50px]">{country.name}</h2>
            <div class="lg:flex lg:flex-row lg:text-md">
                <div>
                    <p class="mb-3"><span class="font-medium">Native Name:</span> {country.native}</p>
                    <p class="mb-3"><span class="font-medium">Population:</span> {country.population}</p>
                    <p class="mb-3"><span class="font-medium">Region:</span> {country.region}</p>
                    <p class="mb-3"><span class="font-medium">Sub Region:</span> {country.subregion}</p>
                    <p class="mb-3"><span class="font-medium">Capital:</span> {country.capital}</p>
                </div>
                <div class="mt-10 lg:mt-0 lg:ml-12">
                    <p class="mb-3"><span class="font-medium">Top Level Domain:</span> {country.top}</p>
                    <p class="mb-3"><span class="font-medium">Currencies:</span> {country.currencies}</p>
                    <p class="mb-3"><span class="font-medium">Languages:</span> {country.lang}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-6 pb-2 lg:ml-[325px] lg:flex">
        <h3 class="ml-10 lg:text-md text-lg font-medium">Border Countries:</h3>
        <div>
            <Borders on:updata={updateCountry} {country}/>
        </div>
    </div>
</section>
<script>

	import ImageLazy from "./ImageLazy.svelte";
	import Borders from "./Borders.svelte";

	import Dompurify from "dompurify";
	import { API } from './readableStore.js';
	import QueryAPI from './Query.js';
	import Error404 from './404.svelte';

	let country = window.location.pathname.split('/')[2];
		country = Dompurify.sanitize(country).toLowerCase().replace(/_/g, " ");

    const goBack = ()=>{
			window.history.back();
    }

	const handle_click= (value)=>{
		country = value.toLowerCase().replace(/_/g, " ");
		window.location.pathname = '/detail/'+country;
	}

</script>
<div class="bg-color-light bg-opacity-5 pt-10 dark:bg-color-dark dark:text-text-color-dark w-screen h-full">
    <button on:click={goBack} class="flex w-[110px] ml-8 h-[34px] mb-[70px] align-baseline items-center justify-center bg-white dark:bg-menu-color-dark dark:text-text-color-dark  font-medium rounded-xs shadow-black shadow-2xl ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back
    </button>
    <section class=" h-full w-screen lg:flex  lg:px-8">
        {#await QueryAPI(`${$API}name/${country}`)}
			<div>
				loading
			</div>
		{:then country}
				<ImageLazy countryFlag={country[0].flags.svg} countryAlt={country[0].flags.alt} />
				<div class="flex flex-col mx-10 ">
					<h2 class="text-2xl font-bold mb-6 mt-[50px]">{country[0].name.common}</h2>
					<div class="lg:flex lg:flex-row lg:text-md">
						<div>
							<p class="mb-3"><span class="font-medium">Native Name:</span> {country[0].name.nativeName[Object.keys(country[0].name.nativeName)[0]].common}</p>
							<p class="mb-3"><span class="font-medium">Population:</span> {country[0].population.toLocaleString('en-US')}</p>
                    		<p class="mb-3"><span class="font-medium">Region:</span> {country[0].region}</p>
                    		<p class="mb-3"><span class="font-medium">Sub Region:</span> {country[0].subregion}</p>
                    		<p class="mb-3"><span class="font-medium">Capital:</span> {country[0].capital}</p>
                		</div>
                		<div class="mt-10 lg:mt-0 lg:ml-12">
                    		<p class="mb-3"><span class="font-medium">Top Level Domain:</span> {country[0].tld}</p>
                    		<p class="mb-3"><span class="font-medium">Currencies:</span> {country[0].currencies[Object.keys(country[0].currencies)[0]].name}</p>
                    		<p class="mb-3"><span class="font-medium">Languages:</span> {Object.values(country[0].languages).toString()} </p>
                		</div>
            		</div>
        		</div>
				<section class="mt-6 pb-2 lg:ml-[325px] lg:flex">
					<h3 class="ml-10 lg:text-md text-lg font-medium">Border Countries:</h3>
					<Borders borders={country[0].borders}/>
				</section>
		{:catch error}
			<Error404 />
		{/await}
    </section>

</div>

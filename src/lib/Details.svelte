<script>

	import ImageLazy from "./ImageLazy.svelte";
	import Borders from "./Borders.svelte";
	import Lazy from "./ImageLazzyDetalles.svelte";
	import Dompurify from "dompurify";
	import { API } from './readableStore.js';
	import QueryAPI from './Query.js';
	import Error404 from './404.svelte';

	let country = window.location.pathname.split('/')[2];
		country = Dompurify.sanitize(country).toLowerCase().replace(/_/g, " ");

    const goBack = ()=>{
			window.history.back();
    }

</script>
<div class="bg-color-light bg-opacity-5 dark:bg-color-dark dark:text-text-color-dark w-full h-full">
    <section class="pt-16 pb-[5.6%]">
		<button on:click={goBack} class="flex w-[110px] ml-8 h-[34px] mb-[70px] align-baseline items-center justify-center bg-white dark:bg-menu-color-dark dark:text-text-color-dark text-[14px] font-thin rounded-xs shadow-black shadow-2xl ">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 mr-3">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
			</svg>
			Back
		</button>
		<article class="px-8">
			{#await QueryAPI(`${$API}name/${country}`)}
			<div class="effects"></div>
		{:then country}
			<section class="flex flex-col lg:flex-row">
				<!-- change lazzy por tipo de tamaño de imagen o refactorizar lazzy acepte propiedades de tamaño -->
				<Lazy countryFlag={country[0].flags.svg} countryName={country[0].flags.alt}/>
				<!-- <ImageLazy countryFlag={country[0].flags.svg} countryAlt={country[0].flags.alt} /> -->
				<div class=" lg:ml-32">
					<article>
						<h2 class="lg:mt-0 mt-8 text-2xl font-bold mb-8">{country[0].name.common}</h2>
						<div class="lg:flex lg:flex-row lg:text-md">
							<div>
								<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Native Name: </span> {country[0].name.nativeName[Object.keys(country[0].name.nativeName)[0]].common}</p>
								<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Population: </span> {country[0].population.toLocaleString('en-US')}</p>
                    			<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Region: </span> {country[0].region}</p>
                    			<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Sub Region: </span> {country[0].subregion}</p>
                    			<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Capital: </span> {country[0].capital}</p>
                			</div>
                			<div class="mt-10 lg:mt-0 lg:ml-32">
                    			<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Top Level Domain: </span> {country[0].tld}</p>
                    			<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Currencies: </span> {country[0].currencies[Object.keys(country[0].currencies)[0]].name}</p>
                    			<p class="mb-1 text-xs font-light"><span class=" font-semibold text-sm mr-1">Languages: </span> {Object.values(country[0].languages).toString()} </p>
                			</div>
            			</div>
					</article>
					<section class="lg:flex lg:mt-20 mt-10 mb-10">
						<h3 class="font-semibold text-sm mr-2">Border Countries:</h3>
						<Borders borders={country[0].borders}/>
					</section>
				</div>
			</section>
		{:catch error}
			<Error404 />
		{/await}
		</article>
	</section>
</div>

<style>
	.effects{
		width: 100%;
		height: 420px;
		border-radius: 1%;
		animation-duration: 2s;
		animation-name: fade;
		background-color: rgba(203, 203, 204, 0.447);
	}
	@keyframes fade{
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}
</style>

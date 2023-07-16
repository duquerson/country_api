<script>
	import { fade } from 'svelte/transition';
    import { API } from './readableStore';
	import ImageLazzy from './ImageLazzy.svelte';
	import QueryAPI from './Query';
	let numElements = 12;
	let elements = Array.from({ length: numElements }, (_, i) => i + 1);
	export let parameters = '';
	let loadButton= false;
	if(!parameters){
		parameters = `${$API}all`;
	}
	//arreglar overflow de diseño
	</script>

<section class="w-full bg-menu-color-light flex gap-[16px] overflow-hidden pt-6 flex-wrap mx-[17px] justify-items-center justify-center dark:bg-color-dark dark:text-white ">
	{#await QueryAPI(parameters)}
		{#each elements as Element }
			{#if !loadButton}
				<div class="w-[280px] h-[350px] animate-pulse  bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl"></div>
			{/if}
		{/each}
	{:then Countries}
		{#each Countries as country}

			<button transition:fade on:load={() => (loadButton = true)} class="w-[270px] h-[350px] bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl">
				<!-- <figure class="rounded-t-lg ">
					<img class="h-[170px] w-full rounded-t-lg" src={country.flags.png}  alt={country.flags.alt} >
				</figure> -->
				<ImageLazzy countryFlag={country.flags.png} countryAlt={country.flags.alt}/>
				<article class="flex flex-col mb-9">
					<h2 class="mx-6 mt-6 mb-4">{country.name.common}</h2>
					<p class="mx-6 mb-1"><span class=" mr-1 mb-4">Population: </span> {country.population.toLocaleString('en-US')}</p>
					<p class="mx-6 mb-1"><span class=" mr-1 mb-4">Region: </span> {country.region}</p>
					<p class="mx-6 mb-1"><span class=" mr-1 mb-4">Capital: </span> {country["capital"]}</p>
				</article>
			</button>
		{/each}
	{/await}

</section>

<style>
	h2{
		font-weight: 800;
		font-size:17px;
		text-align: left;
	}
	span{
		text-align: left;
		font-weight: 800;
		font-size: 15px;
	}
	p{
		text-align: left;
		font-size: 14px;
	}

</style>

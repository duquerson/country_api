<script>
	import { fade } from 'svelte/transition';
	import ImageLazy from './ImageLazy.svelte';
	import { createEventDispatcher } from 'svelte';
	export let country;
	const dispatch = createEventDispatcher();
	const nameCountry = country.name.common.split(' ').join('_');
</script>
<div>
	<button transition:fade on:load={() => (dispatch('load',{loadButton: true}))} class="w-[270px] h-[350px] bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl">
		<!-- <figure class="rounded-t-lg ">
			<img class="h-[170px] w-full rounded-t-lg" src={country.flags.png}  alt={country.flags.alt} >
		</figure> -->
		<a href="/detail/{nameCountry}">
			<ImageLazy countryFlag={country.flags.svg} countryAlt={country.flags.alt}/>
			<article class="flex flex-col mb-9">
				<h2 class="mx-6 mt-6 mb-4">{country.name.common}</h2>
				<p class="mx-6 mb-1"><span class=" mr-1 mb-4">Population: </span> {country.population.toLocaleString('en-US')}</p>
				<p class="mx-6 mb-1"><span class=" mr-1 mb-4">Region: </span> {country.region}</p>
				<p class="mx-6 mb-1"><span class=" mr-1 mb-4">Capital: </span> {country["capital"]}</p>
			</article>
		</a>
	</button>
</div>
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

<script>
    import { API } from './readableStore';
    import { onMount } from 'svelte';
	import QueryAPI from './Query';
	export let Countries = [];
	onMount(async()=>{
		if(Countries){
			Countries = await QueryAPI(`${$API}all`)
			console.log(Countries[0]);
		}
	})//arreglar la logica de carga del loander skeleton
</script>

<section class="h-full w-screen bg-menu-color-light dark:bg-color-dark dark:text-white">
	{#await Countries}
		<p>.....  loading...</p>
	{:then Countries}
		{#each Countries as country}
			<button class="w-[530px] h-[670px]">
				<figure>
					<img src={country.flags.png}  alt={country.flags.alt} >
				</figure>
				<article>
					<h2>{country.name.common}</h2>
					<p><span>Population: </span> {country.population.toLocaleString('en-US')}</p>
					<p><span>Region: </span> {country.region}</p>
					<p><span>Capital: </span> {country.capital}</p>
				</article>
			</button>
		{/each}
	{/await}

</section>

<style>

</style>

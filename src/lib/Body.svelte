<script>
    import { API } from './readableStore';
	import QueryAPI from './Query';
	export let parameters = '';
	if(!parameters){
			parameters = `${$API}all`;
		}
		//arreglar y agregar lazzy image
</script>

<section class="h-full w-screen bg-menu-color-light flex gap-6 flex-wrap px-4 justify-center dark:bg-color-dark dark:text-white ">
	{#await QueryAPI(parameters)}
		<div class="">
			<div class="w-max-[270px] h-[340px] bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl">
				loading
			</div>
		</div>
	{:then Countries}
		{#each Countries as country}
			<button class="w-max-[270px] h-[340px] bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl">
				<figure class="h-max-[160px] rounded-t-lg mb-7">
					<img src={country.flags.png}  alt={country.flags.alt} >
				</figure>
				<article class="flex flex-col mb-8">
					<h2 class="mx-6 mb-3">{country.name.common}</h2>
					<p class="mx-6"><span class=" mr-1 mb-4">Population: </span> {country.population.toLocaleString('en-US')}</p>
					<p class="mx-6"><span class=" mr-1 mb-4">Region: </span> {country.region}</p>
					<p class="mx-6"><span class=" mr-1 mb-4">Capital: </span> {country.capital}</p>
				</article>
			</button>
		{/each}
	{/await}

</section>

<style>
	h2{
		font-weight: 800;
		font-size:19px;
		text-align: left;
	}
	span{
		text-align: left;
		font-weight: 800;
	}
	p{
		text-align: left;

	}
</style>

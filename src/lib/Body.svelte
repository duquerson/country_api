<script>
    import { API } from './readableStore';
    import { onMount } from 'svelte';
	export let Countries = [];
	const getAllCountry = async ()=>{
		try {
			const promise = await fetch(`${$API}all`);
			if(!promise.ok){
				throw new Error(`Error ${promise.status}: Failed Connection to Server`);
			}
			const response = await promise.json();
			return response;
		} catch (error) {
			console.error(error);
			return [];
		}
	};
	onMount(async()=>{
		if (Countries){
			Countries = await getAllCountry();
			console.log(Countries[0]);
		}
	});
</script>

<section class="h-full w-screen bg-menu-color-light dark:bg-color-dark dark:text-white">
	{#each Countries as country}
		<button class="w-[530px] h-[670px]">
			<figure>
				<img src={country.flags.png}  alt={country.flags.alt} >
			</figure>
			<article>
				<h2>{country.name.common}</h2>
				<p><span></span>:</p>
				<p><span></span>:</p>
				<p><span></span>:</p>
			</article>
		</button>
	{/each}
</section>

<style>

</style>

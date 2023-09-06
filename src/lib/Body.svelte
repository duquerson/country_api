<script>
    import { API } from './readableStore';
	import Card from './Card.svelte';
	import QueryAPI from './Query';
	import Error404 from './404.svelte';
	import queryParams from './writableStore';
	let numElements = 12;
	let elements = Array.from({ length: numElements }, (_, i) => i + 1);
	let loadButton= false;
	if(!$queryParams){
		queryParams.set(`${$API}all`);
	}

	</script>

<div class="w-full h-full bg-menu-color-light dark:bg-color-dark dark:text-white pb-[130px]">
	{#await QueryAPI($queryParams)}
		<div class=" spaces pt-4">
			{#each elements as Element }
				{#if !loadButton}
					<article class="w-[280px] h-[350px] animate-pulse  bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl"></article>
				{/if}
			{/each}
		</div>
	{:then Countries}
		<div class=" spaces pt-4 ">
			{#each Countries as country}
				<Card on:Country on:load={(event)=>{loadButton=event.detail.load}} {country}/>
			{/each}
		</div>
	{:catch error}
		<Error404 />
	{/await}
</div>

<style>
	.spaces{
		display: grid;
		gap: 50px;
		justify-items: center;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		grid-template-rows: repeat(auto, 1fr);
	}
</style>

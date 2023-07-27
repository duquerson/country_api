<script>
    import { API } from './readableStore';
	import Card from './Card.svelte';
	import QueryAPI from './Query';
	let numElements = 12;
	let elements = Array.from({ length: numElements }, (_, i) => i + 1);
	export let parameters = '';
	let loadButton= false;
	if(!parameters){
		parameters = `${$API}all`;
	}
	//arregalr busquedas no hacer consulta api en busquedas solo enviar parametros
	</script>

<div class="w-full bg-menu-color-light flex gap-[16px] overflow-hidden pt-6 flex-wrap mx-[17px] justify-items-center justify-center dark:bg-color-dark dark:text-white ">
	{#await QueryAPI(parameters)}
		{#each elements as Element }
			{#if !loadButton}
				<div class="w-[280px] h-[350px] animate-pulse  bg-white dark:bg-menu-color-dark rounded-lg shadow-2xl"></div>
			{/if}
		{/each}
	{:then Countries}
		{#each Countries as country}
			<Card on:load={(event)=>{loadButton=event.detail.load}} {country}/>
		{/each}
	{/await}
</div>

<style>
</style>

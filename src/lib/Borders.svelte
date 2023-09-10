<script>

	import { API } from './readableStore.js';
	import QueryAPI from './Query';

    export let borders = [];

    const handle_click = (value)=>{
		let country = value.toLowerCase().replace(/_/g, " ");
		window.location.pathname = '/detail/'+country;

	}



</script>

<div class="flex flex-wrap lg:ml-10 mt-3 mb-3 gap-2 lg:mt-0 lg:mb-6">
    {#each borders as country}
        {#await QueryAPI(`${$API}alpha/${country}`)}
            loading
        {:then border}
            <button on:click={()=>handle_click(border[0].name.common)} class="flex w-[110px] h-[35px] text-xs items-center justify-center bg-white dark:bg-menu-color-dark dark:text-text-color-dark rounded-xs shadow-2xl ">{border[0].name.common}</button>
        {:catch}
            Error Borders
        {/await}
    {/each}
</div>

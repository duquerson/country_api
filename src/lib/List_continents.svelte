
<script>

    let continents = ['Africa', 'America', 'Asia', 'Europa', 'Oceania'];
    let listOpen = false;
    let select = '';

    const toggle = ()=>{
        listOpen = !listOpen;
    }
    const selectContinent = (continent)=>{
        select = continent
        toggle();
    }
</script>
<div class=" mt-4 lg:mt-0 flex flex-row flex-nowrap lg:w-[200px] w-[440px] h-[60px] justify-between  bg-white dark:bg-menu-color-dark dark:text-white rounded-lg shadow-lg">
	<button on:click={toggle} class="text-sm pl-6 h-[60px]">
        <span  class="flex">
            {#if select}
                {select}
            {:else}
                Filter by Region
            {/if}
        </span>
    </button>
    <div class="pt-5 pr-6">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6" class:rotate-180={listOpen}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </div>
	{#if listOpen}
		<ul class="container__select lg:w-[200px] w-[400px] mt-4 bg-white dark:bg-menu-color-dark dark:text-white flex flex-col rounded-lg shadow-lg">
			{#each continents as continent}
				<button on:click={()=>selectContinent(continent)}>
					<li class="text-left hover:bg-color-light hover:bg-opacity-5 hover:dark:bg-color-dark hover:rounded-lg p-4 pl-6 text-sm">{continent}</li>
				</button>
			{/each}
		</ul>
	{/if}
</div>


<style>
	.container__select{
		position: relative;
		z-index: 1;
	}
</style>


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

<section class="flex flex-row flex-nowrap justify-between dark:text-white">
    <button on:click={toggle} class="text-sm p-3 mt-2">
        <span  class="flex">
            {#if select}
                {select}
            {:else}
                Filter by Region
            {/if}
        </span>
    </button>
    <div>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" class:rotate-180={listOpen}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </div>
</section>
{#if listOpen}
    <ul class="w-[210px] mt-4 bg-white dark:bg-menu-color-dark dark:text-white flex flex-col rounded-lg shadow-lg">
        {#each continents as continent}
            <button on:click={()=>selectContinent(continent)}>
                <li class="text-left hover:bg-color-light hover:bg-opacity-5 hover:dark:bg-color-dark hover:rounded-lg p-4 text-sm">{continent}</li>
            </button>
        {/each}
    </ul>
{/if}



<script>

    import {createEventDispatcher} from 'svelte';

    export let continents = [];
    let listOpen = false;
    let select;
    const dispatch = createEventDispatcher();
    const toggle = ()=>{
        listOpen = !listOpen;
    }
    const listClick = (continents)=>{
        select = continents
        dispatch('continent', select);
        toggle();
    }
</script>

<div class="flex flex-nowrap justify-between">
    <button on:click={toggle} class=" text-sm p-3 mt-2">
        <span  class="flex">
            {#if select}
                {select}
            {:else}
                Filter by Region
            {/if}
        </span>
    </button>
    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-5 mr-2" class:rotate-180={listOpen}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
</div>
{#if listOpen}
    <ul class="w-[210px] mt-4 bg-white dark:bg-menu-color-dark flex flex-col rounded-lg shadow-lg">
        {#each continents as continent}
            <button on:click={()=>listClick(continent)}>
                <li class="text-left hover:bg-color-light hover:bg-opacity-5 hover:dark:bg-color-dark hover:rounded-lg p-4 text-sm">{continent}</li>
            </button>
        {/each}
    </ul>
{/if}

    
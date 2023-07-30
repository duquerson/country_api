<script>
	import { API } from './readableStore.js';
	import { createEventDispatcher } from 'svelte';
	import Dompurify from 'dompurify';

    let value = '';
	let country;
	const dispatch = createEventDispatcher();
    const search = (event)=>{
		value = Dompurify.sanitize(event.target.value);
		if(value.length > 3){
			setTimeout(()=>{
			country = `${$API}name/${value}`;
			dispatch('search', {country: country});
			}, 200);
		}
    }

</script>
<div class="h-[60px] flex flex-row max-w-[200px]">
	<div class="my-auto mx-6 ">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
		</svg>
	</div>
	<form>
		<input bind:value on:input={search} class="lg:w-[365px] w-[250px] px-2 dark:bg-menu-color-dark dark:text-text-color-dark dark:placeholder-text-color-dark" type="search" name="search" id="search" placeholder="Search for a country...">
	</form>
</div>

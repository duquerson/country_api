<script>
    import {createEventDispatcher} from 'svelte';
	import {API} from './readableStore';

    let value = '';
    const searchValue = async (value)=>{
            try {
				const promise = await fetch(`${API}${value}`);
				if(!promise.ok){
					throw new Error(`Error ${promise.status}: Failed Connection to Server`);
				}
				const response = await promise.json();
				console.log(response);
            } catch (error) {
                console.error(error);
            };
        };
    const search = (event)=>{
        value = event.target.value;
        if(value.length > 2 ){
            searchValue(value);
        }
    }

</script>


<div class="text-color-light lg:w-[580px] dark:text-text-color-dark h-[59px] flex content-center mb-[47px] min-w-[343px] bg-white dark:bg-menu-color-dark rounded-lg shadow-lg ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-auto mx-9 ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    <input on:keydown={search} class="w-[70%]  dark:bg-menu-color-dark dark:text-text-color-dark dark:placeholder-text-color-dark" type="search" name="search" id="search" placeholder="Search for a country...">
</div>

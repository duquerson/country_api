<script>
	import {API} from './readableStore';

    let value = '';
    const searchValue = async (value)=>{
            try {
				const promise = await fetch(`${$API}name/${value}`);
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
        if(value.length > 1 ){
            searchValue(value);
        }
    }

</script>
<section class="h-[60px] flex flex-row max-w-[200px]">
	<div class="my-auto mx-6 ">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
		</svg>
	</div>
    <input on:keydown={search} class="lg:w-[365px] w-[250px] px-2 dark:bg-menu-color-dark dark:text-text-color-dark dark:placeholder-text-color-dark" type="search" name="search" id="search" placeholder="Search for a country...">
</section>

<script>
	import ListContinents from './List_continents.svelte';
	import Search from './Search.svelte';
</script>

<!-- <section class="lg:h-[100px] h-[180px] bg-menu-color-light dark:bg-color-dark flex lg:flex-row flex-col ">
	<div class="text-color-light lg:w-[458px] dark:text-text-color-dark h-[60px] flex content-center w-[346px] bg-white dark:bg-menu-color-dark rounded-lg shadow-lg ">
		<Search/>
	</div>
	<div class="mt-4 lg:mt-0">
		<ListContinents/>
	</div>
</section> -->
<div class="container__submenu lg:h-[100px] h-[180px] bg-menu-color-light dark:bg-color-dark">
	<div class="container__submenu--items flex lg:flex-row flex-col justify-between">
		<Search/>
		<ListContinents/>
	</div>
</div>
<style>
	.container__submenu{
		width: 100%;
	}
	.container__submenu--items{
		padding-top: 20px;
		padding-left: 16px;
		padding-right: 16px;
	}


</style>

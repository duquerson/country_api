<script>
	import ListContinets from './List_continets.svelte';
	import Search from './Search.svelte';
</script>

<section class="lg:h-[100px] h-[180px] bg-menu-color-light dark:bg-color-dark flex lg:flex-row  flex-col lg:justify-between">
	<div class="text-color-light lg:w-[460px] dark:text-text-color-dark h-[60px] flex content-center min-w-[346px] bg-white dark:bg-menu-color-dark rounded-lg shadow-lg ">
		<Search/>
	</div>
	<div class="mt-4 lg:mt-0">
		<ListContinets/>
	</div>
</section>

<style>
	section{

		padding-top: 20px;
		padding-left: 16px;
		padding-right: 16px;
	}

</style>

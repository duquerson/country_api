<script>
	import ListContinets from './List_continets.svelte';
	import Search from './Search.svelte';
</script>

<section class="h-[100px] bg-menu-color-light dark:bg-color-dark flex flex-row justify-between">
	<div class="text-color-light lg:w-[460px] dark:text-text-color-dark h-[60px] flex content-center min-w-[346px] bg-white dark:bg-menu-color-dark rounded-lg shadow-lg ">
		<Search/>
	</div>
	<div class="list">
		<ListContinets/>
	</div>
</section>

<style>
	section{
		display: flex;
		flex-direction: row;
		padding-top: 20px;
		padding-left: 16px;
		padding-right: 16px;
	}


</style>

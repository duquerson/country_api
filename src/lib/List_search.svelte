<script>
	import ListContinets from './List_continets.svelte';
	import Search from './Search.svelte';
</script>

<section class="text-color-light  dark:text-text-color-dark h-[90px] bg-menu-color-light dark:bg-menu-color-dark ">
	<div class="">
		<Search/>
	</div>
	<div class="">
		<ListContinets/>
	</div>
</section>

<style>
	section{
		display: flex;
		flex-direction: row;
		padding-top: 10px;
		padding-left: 16px;
		padding-right: 16px;
	}
</style>

<script>
	import ListContinents from './List_continents.svelte';
	import Search from './Search.svelte';
</script>

<div class="container__submenu lg:h-[100px] h-[180px] bg-menu-color-light dark:bg-color-dark">
	<div class="container__submenu--items flex lg:flex-row flex-col justify-between">
		<Search on:search/>
		<div>
			<ListContinents on:select/>
		</div>
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

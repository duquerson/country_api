<script>
	import { API } from "./readableStore.js";
	import { createEventDispatcher } from "svelte";
	import Dompurify from "dompurify";

	let value = "";
	const dispatch = createEventDispatcher();
	const search = () => {
		value = Dompurify.sanitize(value).toLowerCase();

		if (value.trim() !== "") {
			const data = { params: `${$API}name/${value}` };
			dispatch("search", data);
		}else{
			const data = {params: ''};
			dispatch("search", data);
		}

	};
</script>

<div
	class="h-[60px] w-[316px] lg:w-[420px] ml-3 bg-white dark:bg-menu-color-dark dark:text-white rounded-xl"
>
	<form class="search" on:submit|preventDefault={search}>
		<div class="my-auto ml-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.8"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</div>
		<label for="search">
			<input
				bind:value
				class="pl-2 h-[60px] w-[270px] lg:w-[370px] dark:bg-menu-color-dark dark:text-text-color-dark dark:placeholder-text-color-dark"
				type="search"
				name="search"
				id="search"
				placeholder="Search for a country..."
			/>
		</label>
	</form>
</div>

<style>
	.search {
		display: flex;
		align-items: center;
	}
</style>

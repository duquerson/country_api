<script>
	import { onMount } from "svelte";
	import Header from "./template/Header.svelte";
	import P404 from "./lib/404.svelte";
	import ListSearch from "./lib/List_search.svelte";
	import Body from "./lib/Body.svelte";
	let country = "";
	const handleEvents = (event) => {
		country = event.detail.country;
	};



</script>

<main>
	<Header />
	<ListSearch on:search={handleEvents} on:select={handleEvents} />
	<Body parameters={country} />
</main>

<style>
	:global(body) {
		font-family: "Plus Jakarta Sans", sans-serif;
	}
</style>

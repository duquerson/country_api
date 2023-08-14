<script>
	import { onMount } from "svelte";
	import Header from "./template/Header.svelte";
	import P404 from "./lib/404.svelte";
	import ListSearch from "./lib/List_search.svelte";
	import Body from "./lib/Body.svelte";
	import { element } from "svelte/internal";

	let country = "";
	let currentRoute = "";
	let visitedRoutes = [];

	const routes = {
		"/": [ListSearch, Body],
		"/search": [ListSearch, Body],
		"/region": [ListSearch, Body],
	};
	const getRoute = () =>
		location.hash.slice(1).toLocaleLowerCase().split("/")[1] || "/";

	const resolveRoutes = (route) => {
		const validRoutes = Object.keys(routes);
		let matchingRoute = route;
		for (const validRoute of validRoutes) {
			if (validRoute.includes(route)) {
				matchingRoute = validRoute;
			}
		}
		return matchingRoute;
	};
	const handleRouteChange = () => {
		currentRoute = window.location.pathname;
		let hash = getRoute();
		let rut = resolveRoutes(hash);
		let result = routes[rut] ? routes[rut] : P404;
		console.log(result);
	};

	const handleEvents = (event) => {
		country = event.detail.country;
		handleRouteChange();
	};

	onMount(handleRouteChange);
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

<script>


import queryParams from './lib/writableStore';
import {Router, Route} from 'svelte-routing';

import Header from "./template/Header.svelte";
import ListSearch from "./lib/List_search.svelte";
import Page404 from "./lib/404.svelte";
import Details from './lib/Details.svelte';
import Body from "./lib/Body.svelte";
//no con eventos no cons storage usar leer pathname el nombre del pais y hacer consulta del nombre del pais y mostrar datos


	const handleEvents = (event) => {
		queryParams.set(event.detail.params);
	};

</script>

<main>
	<Header />
	<Router>
		<Route path='/'>
			<ListSearch on:search={handleEvents} on:select={handleEvents} />
			<Body />
		</Route>
		<Route path='/detail/:id'>
			<Details />
		</Route>
		<Route path='*' component={Page404}/>
	</Router>
</main>

<style>
	:global(body) {
		font-family: "Plus Jakarta Sans", sans-serif;
	}
</style>

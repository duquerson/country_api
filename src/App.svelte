<script>
  import { onMount } from "svelte";
  import Header from "./template/Header.svelte";
  import P404 from "./lib/404.svelte";
  import ListSearch from "./lib/List_search.svelte";
  import Body from "./lib/Body.svelte";

	//arreglar el router y rutas
  let country ='';
	let value = '';
  let currentRoute = '';
  let url='';
  const handleRouteChange = () => {
    currentRoute = window.location.pathname;
  };
  const handleSearch = (event)=>{
	country = event.detail.country;
	value = event.detail.value;
	url = window.location.hash = value;
	window.location.pathname = 'search';
	window.history.pushState(null, null, 'search');
	console.log(url);
    handleRouteChange();
  }
	const handleList = (event)=>{
		country = event.detail.country;
		value = event.detail.value;

		window.history.pushState(null, null, value);
		//window.history.pushState(null, null, value);
		handleRouteChange();
	}
  onMount(() => handleRouteChange());
</script>

<main>
  <Header />
  {#if currentRoute === "/"}
    <ListSearch on:search={handleSearch} on:select={handleList} />
    <Body parameters={country} />
  {:else if currentRoute === '/search'}
  	<ListSearch on:search={handleSearch} on:select={handleList} />
    <Body parameters={country} />
  {:else}
    <P404 />
  {/if}

</main>
<style>
	:global(body){
		font-family: 'Plus Jakarta Sans', sans-serif;
	}

</style>

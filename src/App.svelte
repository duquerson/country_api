<script>
  import { onMount } from "svelte";
  import Header from "./template/Header.svelte";
  import P404 from "./lib/404.svelte";
  import ListSearch from "./lib/List_search.svelte";
  import Body from "./lib/Body.svelte";

  let currentRoute = "";
  const handleRouteChange = () => {
    currentRoute = window.location.pathname;
  };
  onMount(() => handleRouteChange());
</script>

<main>
  <Header />
  {#if currentRoute === "/"}
	<ListSearch on:search/>
	<!-- <Body/> -->
  {:else if currentRoute === "/:search"}
    <p>search</p>
  {:else}
    <P404 />
  {/if}
</main>
<style>
	:global(body){
		font-family: 'Plus Jakarta Sans', sans-serif;
	}

</style>

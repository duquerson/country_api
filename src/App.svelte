<script>
  import { onMount } from "svelte";
  import Header from "./template/Header.svelte";
  import P404 from "./lib/404.svelte";

  let currentRoute = "";
  const handleRouteChange = () => {
    currentRoute = window.location.pathname;
  };
  onMount(() => handleRouteChange());
</script>

<main>
  <Header />
  {#if currentRoute === "/"}
    <p>inico</p>
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

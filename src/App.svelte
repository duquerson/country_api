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
    busqueda
  {:else}
    <P404 />
  {/if}
</main>

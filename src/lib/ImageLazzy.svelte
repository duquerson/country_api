<script>
	//This code is importing the `onMount` and `afterUpdate` functions from the Svelte library,
	//defining some variables and options, and setting up an IntersectionObserver to
	//lazy load an image when it becomes visible in the viewport.
	//The `countryFlag` variable is passed in as a prop and used as the source for the image.
	//The `imgContainer` variable is used to reference the container element for the image.
	//The `imageLoaded` variable is used to track whether the image has finished loading.
	//The `loadImg` function is called when the IntersectionObserver detects that the container
	//element is visible in the viewport, and it sets the `src` attribute of the image to `countryFlag` and
	//removes the `data-src` attribute. The `createObserver` variable is used to store the IntersectionObserver
	//instance, and it is set up in the `onMount` lifecycle function and updated in the `afterUpdate` lifecycle function.
	import { onMount, afterUpdate } from "svelte";
	let imgContainer;
	let imageLoaded=false;
	export let countryFlag;
    export let countryName;
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};
	const loadImg = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const image = entry.target.querySelector("img");
				if(!image.src){
					image.src= countryFlag;
				}
				image.removeAttribute("data-src");
				createObserver.unobserve(entry.target);
			}
		});
	};
	let createObserver;

	onMount(() =>{
		createObserver = new IntersectionObserver(loadImg, options);
		createObserver.observe(imgContainer);
		return () => createObserver.unobserve(imgContainer);
	});
	afterUpdate(()=>createObserver.observe(imgContainer));
</script>

<figure bind:this={imgContainer} class="h-[276px] w-full">
	{#if !imageLoaded}
		<div class="w-[270px] h-[270px] animate-pulse bg-gray-200 shadow-2xl"></div>
	{/if}
	<img class="imgCountry rounded-t-lg" on:load={() => (imageLoaded = true)} data-src={countryFlag} alt={`flag of ${countryName}`} decoding="async" loading="lazy" />
</figure>

<style>
    .imgCountry{
        width: 375px;
        height: 276px;
    }
</style>
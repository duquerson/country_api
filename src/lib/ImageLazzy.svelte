<script>
	import { onMount, afterUpdate } from "svelte";
	let imgContainer;
	let imageLoaded=false;
	export let countryFlag;
    export let countryAlt;
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};
	const loadImg = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const image = entry.target.querySelector("img");
				if(!image.src) {
					image.src = countryFlag;
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

<figure bind:this={imgContainer} class="h-max-[160px] rounded-t-lg mb-7">
	{#if !imageLoaded}
		<div class="w-[270px] h-max-[160px] animate-pulse bg-gray-200 border-light-800"></div>
	{/if}
	<img class="imgCountry rounded-t-lg" on:load={() => (imageLoaded = true)} data-src={countryFlag} alt={countryAlt} decoding="async" loading="lazy" />
</figure>

<style>
	img {
		max-width: 270px;
	}
    .imgCountry{
		aspect-ratio: 16/9; /*16/9*/
		object-fit: cover;
    }
</style>

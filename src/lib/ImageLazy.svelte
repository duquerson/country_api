<script>
	import { onMount, afterUpdate } from "svelte";
	import { fade } from 'svelte/transition';
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

<figure bind:this={imgContainer} class="rounded-t-lg">
	{#if !imageLoaded}
		<div class="efects"></div>
	{/if}
	<img class="h-[170px] w-full rounded-t-lg " transition:fade on:load={() => (imageLoaded = true)} data-src={countryFlag} alt={countryAlt} decoding="async" loading="lazy" />
</figure>

<style>
	img {
		object-fit: cover;
	}
	.efects{
		width: 280px;
		height: 170px;
		border-radius: 3%;
		animation-duration: 2s;
		animation-name: fade;
		background-color: azure;
	}
	@keyframes fade{
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
	}
</style>

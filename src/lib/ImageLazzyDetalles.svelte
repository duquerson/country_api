<script>
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
				/* if(!image.src){
					image.src= countryFlag;
				} */
                image.src=countryFlag;
				image.removeAttribute("data-src");
				createObserver.unobserve(entry.target);
			}
		});
	};
	let createObserver;
    createObserver = new IntersectionObserver(loadImg, options);

	onMount(() =>{
		createObserver.observe(imgContainer);
		return () => createObserver.unobserve(imgContainer);
	});
    
	afterUpdate(()=>{createObserver.observe(imgContainer)});
</script>

<figure bind:this={imgContainer} class="flex flex-col items-center lg:justify-top lg:mt-8">
	{#if !imageLoaded}
		<div class="w-[300px] h-[300px] animate-pulse bg-gray-200 shadow-2xl"></div>
	{/if}
	<img on:load={() => (imageLoaded = true)} data-src={countryFlag} alt={`flag of ${countryName}`} decoding="async" loading="lazy" />
</figure>
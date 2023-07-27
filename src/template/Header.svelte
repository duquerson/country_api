<script>

    let mode = false;
    const toggle = ()=>{
        mode = !mode;
    }
    const handleMode = ()=>{
        document.documentElement.classList.toggle('dark');
        toggle()
    }

</script>
<header class=" bg-white text-text-color-light dark:bg-menu-color-dark dark:text-text-color-dark h-[130px] w-screen flex flex-col justify-center px-4 shadow-lg">
    <nav class="flex justify-between px-4">
        <h1 class="font-extrabold text-sm"><a href="/" class="text-lg">Where in the world?</a></h1>
        <div class="flex font-medium text-sm">
            {#if mode}
                    <svg  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                {:else}
                    <svg  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                {/if}
            <button on:click={handleMode} class="ml-2 cursor-pointer font-extrabold">
                {mode ? 'light Mode' : 'Dark Mode'}
            </button>
        </div>
    </nav>
</header>

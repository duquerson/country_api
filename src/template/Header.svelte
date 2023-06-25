<script>
    const API = 'https://restcountries.com/v3.1/';
    import axios from 'axios';
    const axio = axios.create({
        baseURL: `${API}`
    });
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import Search from "./Search.svelte";
    import Lista from "./List_continets.svelte"
    let recibido;
    let listContinents = [
        'Africa',
        'America',
        'Asia',
        'Europe',
        'Oceania'
    ];
    const vista = async (recibido)=>{
            try {
                const {data} = await axio(`region/${recibido}`);
                
                dispatch('selectcontinent', data);
            } catch (error) {
                console.error(error);
            };
        };
    const select = (event)=>{
        recibido = event.detail;
        vista(recibido);
    };
    const search = (event)=>{
        let search = event.detail;
        dispatch('selectcontinent', search );
    }
</script>
<div class=" w-screen h-full bg-color-light bg-opacity-5 dark:bg-color-dark py-[22px] lg:py-[60px] lg:px-4 ">
    <header class="w-[90%] mx-4 lg:mx-0 flex flex-col lg:flex-row lg:w-full lg:justify-between ">
        <Search on:search={search}/>
        <div class="w-[210px] h-[59px] bg-white dark:bg-menu-color-dark dark:text-text-color-dark rounded-lg shadow-lg" >
            <Lista on:continent={select} continents={listContinents}/>
        </div>
    </header>
</div>


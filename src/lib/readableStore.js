import { readable } from 'svelte/store'

const URL = 'https://restcountries.com/v3.1/'

export const API = readable(URL)

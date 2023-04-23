/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,svelte}'
    ],
    theme: {
        extend: {
            colors: {
                'text-color-dark': 'hsl(0, 0%, 100%)',
                'menu-color-light': 'hsl(0, 0%, 98%)',
                'color-light': 'hsl(0, 0%, 52%)',
                'text-color-light': 'hsl(200, 15%, 8%)',
                'menu-color-dark': 'hsl(209, 23%, 22%)',
                'color-dark': 'hsl(207, 26%, 17%)'
            }
        }
    },
    plugins: []
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                'text-light': 'var(--text-light)',
                'text-dark': 'var(--text-dark)',
                'text-secondary-light': 'var(--text-secondary-light)',
                'text-secondary-dark': 'var(--text-secondary-dark)',
                'primary': 'var(--primary)',
                'background-light': 'var(--background-light)',
                'background-dark': 'var(--background-dark)',
                'card-light': 'var(--card-light)',
                'card-dark': 'var(--card-dark)',
            },
        },
    },
    plugins: [],
}

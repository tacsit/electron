/** @type {import('tailwindcss').Config} */
module.exports = {
    // https://tailwindcss.com/docs/content-configuration
    content: [
        './src/**/*.html',
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.css',
    ],
    theme: {
        extend: {
            animation: {
                'pulse-slow': 'pulse 4s linear infinite'
            }
        }
    },
    plugins: [
        require('@headlessui/tailwindcss'),
        require('tailwind-scrollbar'),
    ]
}

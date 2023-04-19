import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

/**
 * @see https://evite.netlify.app/config/#config-file
 */

export default defineConfig({
    main: {
        resolve: {
            alias: {
                '@/main': resolve('src/main')
            }
        },
        build: {
            outDir: resolve('.electron/out/main'),
            
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        resolve: {
            alias: {
                '@/preload': resolve('src/preload')
            }
        },
        build: {
            outDir: resolve('.electron/out/preload'),
            
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@/renderer': resolve('src/renderer')
            }
        },
        build: {
            outDir: resolve('.electron/out/renderer'),
            
        },
        css: {
            // indicate the postcss config file
            postcss: resolve('.config/postcss.config.js')
        },
        plugins: [react()]
    }
})

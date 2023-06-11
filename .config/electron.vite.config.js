import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import react from '@vitejs/plugin-react'

/**
 * @see https://evite.netlify.app/config/#config-file
 */
// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // By default, only env variables prefixed with `MAIN_VITE_`,
//   // `PRELOAD_VITE_` and `RENDERER_VITE_` are loaded,
//   // unless the third parameter `prefixes` is changed.
//   const env = loadEnv(mode)
//   return {
//     // electron-vite config
//   }
// })

export default defineConfig((command, mode) => {

    // set the env file path in the parent directory
    const env = loadEnv(mode, resolve(__dirname, '..'))

    return {
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
    }
})

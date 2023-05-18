import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(( mode ) => {
  const env = loadEnv(mode.mode, './', '' )

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: false,
      port: env.VITE_APP_PORT,
      proxy: {
        '/api': {
          target: `${env.VITE_BACKEND_API}:${env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
  }
})

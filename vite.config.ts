import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = parseInt(env.APP_PORT || '3000')
  const backendUrl = env.BACKEND_URL || 'http://localhost:4001'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@/codegen': path.resolve(__dirname, './codegen'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port,
      strictPort: true, // Don't try next available port
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
    base: env.APP_BASENAME_PATH || '/',
  }
})

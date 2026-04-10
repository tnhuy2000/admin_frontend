import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = parseInt(env.VITE_APP_PORT || '3000')
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:4001'

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
    base: env.VITE_APP_BASENAME_PATH || '/',
    build: {
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          manualChunks: {
            // Tách thư viện core
            vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],

            // Tách Ant Design riêng (rất quan trọng)
            antd: ['antd'],

            // Tách Tiptap (editor nặng)
            tiptap: [
              '@tiptap/react',
              '@tiptap/starter-kit',
              '@tiptap/extension-color',
              '@tiptap/extension-highlight',
              '@tiptap/extension-image',
              '@tiptap/extension-link',
              '@tiptap/extension-placeholder',
              '@tiptap/extension-text-align',
              '@tiptap/extension-text-style',
              '@tiptap/extension-underline'
            ],

            // Apollo + GraphQL
            apollo: ['@apollo/client', 'graphql'],
          }
        }
      }
    }
  }
})

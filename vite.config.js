import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'serve' ? '/' : '/leehx78-home/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/variable" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
}));

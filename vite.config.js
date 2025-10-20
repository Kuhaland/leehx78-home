import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
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
      '/kma': {
        target: 'https://apihub.kma.go.kr',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/kma/, '/api/typ01/url')
      }
    }
  },
});

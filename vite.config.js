import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/AppData/**', '**/.git/**'],
    },
    proxy: {
      '/spares/api': {
        target: 'https://spares.salvinindia.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://spares.salvinindia.com',
        changeOrigin: true,
      },
    },
  },
});

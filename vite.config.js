import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const targetDomain = env.VITE_API_TARGET || 'https://spares.salvinindia.com';

  return {
    plugins: [react()],
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/AppData/**', '**/.git/**'],
      },
      proxy: {
        '/spares/api': {
          target: targetDomain,
          changeOrigin: true,
        },
        '/uploads': {
          target: targetDomain,
          changeOrigin: true,
        },
        '/spares/upload': {
          target: targetDomain,
          changeOrigin: true,
        },
      },
    },
  };
});

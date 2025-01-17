import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' prefix when forwarding
      },
      '/localapi': {
        target: 'http://localhost:3000', // Adjust to your local server's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/localapi/, ''), // Removes '/localapi' prefix when forwarding
      },
    },
  },
});

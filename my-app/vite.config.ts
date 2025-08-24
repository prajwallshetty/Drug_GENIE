import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This is the part that connects the frontend to the backend.
      // It tells Vite: "any request that starts with /api, send it to localhost:5001"
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
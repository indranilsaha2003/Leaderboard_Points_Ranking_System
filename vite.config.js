import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: './src', // 👈 tells Vite your frontend is in /src
  plugins: [react()],
  build: {
    outDir: '../dist', // 👈 output to root-level dist folder
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});

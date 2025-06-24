import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/grimwild-tools',
  build: {
    emptyOutDir: false,
    outDir: 'dist'
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import analyze from 'vite-bundle-analyzer';

export default defineConfig({
  plugins: [react(), analyze()],
});

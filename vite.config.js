import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import analyze from 'vite-bundle-analyzer';

export default defineConfig({
  plugins: [
    react(),
    // Only enable analyzer in build mode with --analyze flag
    process.env.ANALYZE === 'true' ? analyze() : null
  ],
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    // Allow access from network
    host: true,
  }
});

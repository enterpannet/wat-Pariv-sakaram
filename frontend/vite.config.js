import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'วัดหนองขนาก',
        short_name: 'WNKN',
        description: 'www.wnkn.org',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'wnkn192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'wnkn512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Customize chunking here
        manualChunks: {
          // Example of moving dependencies to a vendor chunk
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Optional: Increase chunk size limit if necessary
    chunkSizeWarningLimit: 2000, // Adjust limit as needed, here set to 2000 kB
  },
});

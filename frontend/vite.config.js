import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ให้ Vite ฟังทุกการเชื่อมต่อจากภายนอก
    port: 3000,
    hmr: {
      host: '210.246.215.231', // ใช้ IP หรือโดเมนของ VPS
      port: 3000
    }
  }
});

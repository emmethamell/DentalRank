import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.dentalrank.us',
      dynamicRoutes: [
        '/',       
        '/rank',   
        '/signin', 
        '/signup',
      ],
      readable: true, 
      changefreq: 'daily',
      priority: 1.0,
    }),
  ],
})

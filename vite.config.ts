import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/agc-react/', 
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, './src/types/index.tsx'),
      '@components': path.resolve(__dirname,'./src/components/index.tsx'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
})

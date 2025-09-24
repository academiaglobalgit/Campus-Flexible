import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    base: !isProduction ? '/agc-react/' : '',
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@constants': path.resolve(__dirname, './src/types/index.tsx'),
        '@components': path.resolve(__dirname,'./src/components/index.tsx'),
        '@iconsCustomizeds': path.resolve(__dirname, './src/assets/IconsCustomize'),
        '@styles': path.resolve(__dirname, './src/styles/styles.tsx'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    define: {
      global: {}
    },
    build: {
      rollupOptions: {
        output: {
          // Generar nombres únicos para evitar cache
          entryFileNames: `assets/[name].${Date.now()}.[hash].js`,
          chunkFileNames: `assets/[name].${Date.now()}.[hash].js`,
          assetFileNames: `assets/[name].${Date.now()}.[hash].[ext]`
        }
      }
    },
    server: {
      // Para desarrollo - desactivar cache
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }
  }
})
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
        '@iconsCustomizeds': path.resolve(__dirname, './src/assets/IconsCustomize')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    define: {
      global: {}
    }
  }
})
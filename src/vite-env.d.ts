/// <reference types="vite/client" />
declare module '*.svg?react' {
  import { ReactComponent } from 'react';
  const content: ReactComponent;
  export default content;
}

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    white: true;
  }
}
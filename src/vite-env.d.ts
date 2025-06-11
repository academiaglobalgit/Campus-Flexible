/// <reference types="vite/client" />
declare module '*.svg?react' {
  import { ReactComponent } from 'react';
  const content: ReactComponent;
  export default content;
}
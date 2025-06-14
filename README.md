# React + TypeScript + Vite
Este proyecto utiliza Vite como herramienta de construcción.

# Estructura de carpetas (Atomic Design)

```bash
src/
│
├── assets/                # Archivos estáticos (imágenes, fuentes, etc.)
│
├── components/            # Componentes organizados por Atomic Design
│   ├── atoms/             # Componentes atómicos básicos
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.test.js
│   │   ├── Input/
│   │   ├── Icon/
│   │   └── ...            
│   │
│   ├── molecules/         # Componentes formados por átomos
│   │   ├── SearchBar/
│   │   ├── Card/
│   │   └── ...            
│   │
│   ├── organisms/         # Componentes complejos formados por moléculas/átomos
│   │   ├── Header/
│   │   ├── Grid/
│   │   └── ...            
│   │
│   ├── templates/         # Estructuras de página (sin contenido específico)
│   │   ├── MainTemplate/
│   │   ├── AuthTemplate/
│   │   └── ...            
│   │
│   └── pages/             # Páginas completas (usan templates y componentes)
│       ├── Home/
│       ├── Product/
│       └── ...            
│
├── hooks/                # Custom hooks
│   ├── useLocalStorage.tsx
│   └── ...                
│
├── context/              # Contextos de React
│   ├── AuthContext.tsx
│   └── ...                
│
├── services/             # Lógica de servicios/API
│   ├── api.tsx│   
│   └── ...                
│
├── utils/                # Funciones utilitarias
│   ├── helpers.tsx│   
│   └── ...                
│
├── styles/               # Estilos globales y variables
│   ├── globals.css│   
│   └── ...                
│
└── App.tsx                # Componente raíz de la aplicación


## Comandos Esenciales
A continuación, se detallan los comandos más comunes:
- `npm install`: Instala las dependencias del proyecto.
- `npm run dev`: Inicia el servidor de desarrollo en modo de desarrollo.
- `npm run build`: Compila el proyecto para producción.
- `npm run preview`: Previsualiza el proyecto compilado en modo de producción.

- `git clone <url>`: Clona un repositorio desde GitHub.
- `git pull`: Actualiza tu rama local con los cambios del repositorio remoto.
- `git push`: Envía tus cambios al repositorio remoto.

## Extensiones recomendadas
- ESLint: Ayuda a mantener un estilo de código consistente y detectar errores.
- Prettier: Formatea automáticamente el código para una mejor legibilidad.
- Prettier + ESLint: Integración de Prettier con ESLint para formatear automáticamente el código.
- GitLens: Mejora la experiencia de Git en Visual Studio Code.
- GitHub Pull Requests: Facilita la creación de solicitudes de extracción en GitHub.

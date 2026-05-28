# Panini Mundial 2026

Aplicación web PWA para administrar álbum Panini Mundial 2026.

## Stack

- React + Vite
- TailwindCSS
- React Router
- Zustand
- Supabase
- PWA

## Configuración inicial

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Arranca la app en desarrollo:
   ```bash
   npm run dev
   ```

## Estructura propuesta

- `src/components/` - UI atómicos y layout
- `src/pages/` - pantallas principales
- `src/services/` - Supabase y helpers de datos
- `src/store/` - estado global con Zustand
- `src/types/` - tipos TypeScript
- `src/hooks/` - hooks reutilizables
- `src/styles/` - estilos globales

## Roadmap por fases

1. Configuración PWA y base del diseño
2. Autenticación y rutas protegidas
3. Estructura de álbum, filtros y búsqueda
4. Estatus offline y sincronización local
5. Exportación, intercambio y ranking
6. Mejora de UI/UX con animaciones y temas

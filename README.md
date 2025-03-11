# SNN - Value Stream y Production Lines

Este proyecto contiene un módulo para manejar opciones de producción, permitiendo la gestión eficiente de líneas de producción, flujos de valor y metas de producción.

## Requisitos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/robertocalvo27/SNN-Value-Stream-y-Production-Lines.git
cd SNN-Value-Stream-y-Production-Lines
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173/`

## Construcción para producción

Para construir la aplicación para producción:

```bash
npm run build
# o
yarn build
```

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (iconos)

## Funcionalidades principales

### Gestión de Value Streams
- Crear, editar, activar/desactivar Value Streams
- Gestión de líneas de producción asociadas a cada Value Stream

### Metas de Producción
- Configuración de metas de eficiencia, volumen y horas por línea de producción
- Filtrado por tipo de meta (eficiencia, volumen, horas)
- Gestión de fechas de vigencia para cada meta

### Módulos adicionales (en desarrollo)
- Capacidad
- Entrada de Datos
- Run Rates
- Paros Programados
- Causas

## Estructura del proyecto

- `src/`: Código fuente de la aplicación
  - `App.tsx`: Componente principal de la aplicación
  - `main.tsx`: Punto de entrada de la aplicación
  - `index.css`: Estilos globales

## Contribución

1. Crea un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request 
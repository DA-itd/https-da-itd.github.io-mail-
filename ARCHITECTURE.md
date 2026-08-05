# ARCHITECTURE.md

## Arquitectura del Proyecto - v23.0 Beta

### Organización de Carpetas
- \`src/components/ui\`: Componentes base y reutilizables (Button, Card, Modal, etc.).
- \`src/components/features\`: Componentes agrupados por característica (Builder, Settings, Library, etc.).
- \`src/contexts\`: Contextos de React (Configuración global, Tema, Institución).
- \`src/store\`: Estado global con Zustand (Bloques, Proyectos, Estado del Editor).
- \`src/hooks\`: Custom hooks de React.
- \`src/types\`: Definiciones de TypeScript centralizadas.
- \`src/utils\`: Funciones utilitarias (generación de HTML, fix de URLs).

### Gestión de Estado
- **Zustand:** Se utiliza para manejar el estado del editor (bloques actuales, historial, proyectos). Es ligero y evita renders innecesarios.
- **React Context API:** Se utiliza para configuraciones de solo lectura a nivel global o que cambian raramente (configuración de la institución, temas).

### Principios
El proyecto sigue principios de modularidad y responsabilidad única. Los componentes UI son "tontos" (dumb components) y reciben datos por props, mientras que los contenedores manejan la lógica conectándose a Zustand o a los Contextos.

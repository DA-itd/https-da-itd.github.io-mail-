# CHANGELOG.md

## [23.0.0] - Sprint 0 (Refactorización Base)

### Añadido
- Documentación de arquitectura (\`ARCHITECTURE.md\`).
- Reglas del proyecto (\`PROJECT_RULES.md\`).
- Integración de \`zustand\` para el manejo del estado del editor.
- Creación de Context API para la configuración institucional.
- Estructura modular base (\`components/ui\`, \`components/features\`, \`store\`, \`contexts\`, \`hooks\`).

### Cambiado
- Se refactorizó \`src/App.tsx\` para utilizar estado global en lugar de \`useLocalStorage\` local.
- Se dividieron componentes grandes en piezas más pequeñas.
- Migración de estado de bloques y configuración a Zustand y Context respectivamente.

### Eliminado
- Archivos y configuraciones obsoletas o código muerto del generador v22.

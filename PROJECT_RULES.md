# PROJECT_RULES.md

## Constitución del Proyecto

- **Límites de Componentes:** No crear componentes de más de 300 líneas.
- **DRY (Don't Repeat Yourself):** No duplicar lógica. Extraer hooks y utilidades según sea necesario.
- **Responsabilidad Única:** Un componente = una responsabilidad.
- **Documentación:** Toda nueva función debe incluir documentación.
- **Separación de Inquietudes:** No mezclar lógica de negocio con la interfaz visual. Usar hooks para la lógica.
- **Gestión de Temas:** Los colores deben obtenerse del tema institucional, nunca escribirse directamente (hardcoded) en los componentes.
- **Internacionalización:** Todo texto visible debe prepararse para futura internacionalización (i18n).

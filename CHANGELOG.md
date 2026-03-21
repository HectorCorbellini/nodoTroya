# Changelog - Nodo Nueva Troya

Todas las modificaciones notables a este proyecto serán documentadas en este archivo.

## [0.1.1] - 2026-03-20

### Mejorado
- **Refactor de Activos**: Reubicación de imágenes a `/public/images/` para optimizar la carga y organización.
- **Experiencia de Usuario (UX)**: Implementación de enlace de WhatsApp inteligente con mensaje personalizado para "Enrique".
- **SEO y Móvil**: Inclusión de meta tags (`description`, `theme-color`) y validación de `viewport`.
- **Arquitectura Híbrida**: Documentación de la separación de capas (Netlify/Supabase/Local) y creación de `DEPLOYMENT.md`.
- **Limpieza**: Eliminación de código muerto (CSS no usado, scripts de prueba y archivos temporales/borradores).

### Corregido
- **Sincronización de Variables**: Refactorizado `supabase.js` para soportar nombres estándar de Node.js (`SUPABASE_URL`) en local y prefijos de Vite (`VITE_`) en la nube.
- **Bug de Entorno**: Corregido error en `supabase.js` que causaba fallos al ejecutar el servidor en entornos Node.js.
- **Higiene DB**: Eliminación de tablas redundantes y activación de Realtime en el entorno de producción.
- **Puesta en Marcha**: Inicialización exitosa de la tabla `sensors` en Supabase.
- **Robustez de API**: Blindaje contra crashes y restauración de `express.json()`.
- **Seguridad**: Eliminación de claves por defecto en `.env.example` y documentación de despliegue.
- **Optimización de Middleware**: Reordenamiento de rutas de API sobre archivos estáticos para evitar interferencias.
- **Consistencia**: Sincronización del `README.md` con los nombres reales de los archivos y la estructura del proyecto.

## [0.1.0] - 2026-03-19

### Añadido
- **Infraestructura Web**: Inicialización del proyecto con Vite, Vanilla JS y CSS.
- **Catálogo Digital**: Implementación de una interfaz premium y responsiva con categorías para Soberanía Alimentaria, Hardware Libre y Comunicación.
- **Integración WhatsApp**: Generación automática de enlaces y códigos QR vinculados al número de contacto de "Orquestador de Sistemas" (**091633183**).
- **Gestión de Activos**: Integración de los archivos visuales `nuevaTroya_AFICHE.png`, `nuevaTroya_VOLANTE.png`, `muestra_Arroz.png` y `muestra_Jugos.png`.
- **Servidor Unificado**: Unificación de la lógica de backend en un solo `server.js` minimalista que sirve los archivos estáticos y gestiona los sensores simultáneamente.
- **Despliegue Cloud**: Configuración de `netlify.toml` para hosting profesional y persistente en Netlify.
- **Escalabilidad**: Migración de datos estáticos a una arquitectura basada en variables de entorno y base de datos distribuida.

### Seguridad
- Implementación de la "Táctica del Nodo de Investigación" en la comunicación exterior, priorizando el contacto directo vía QR/WhatsApp para evitar riesgos regulatorios inmediatos.

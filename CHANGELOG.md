# Changelog - Nodo Nueva Troya

Todas las modificaciones notables a este proyecto serán documentadas en este archivo.

## [0.1.2] - 2026-03-21

### Mejorado
- **Gestión de Productos (Admin)**: Creado `admin.html` para que Enrique gestione el catálogo desde el celular. CRUD completo conectado a Supabase.
- **Productos Dinámicos**: `index.html` ahora lee productos desde la tabla `productos` en Supabase con actualizaciones en tiempo real.
- **UI/UX Botón**: Cambiado texto de "Consultar Catálogo" a "Ver Catálogo" con fuente más grande (1.5rem) y posición ajustada.
- **Pilar Tecnológico**: Agregado bloque agro-monitor con simulación de datos de suelo mientras se conecta el hardware.
- **QR Actualizado**: Nuevo QR apuntando a Netlify con color verde bosque (#1b5e20) y alta corrección de errores.
- **Optimización de Imágenes**: Reemplazadas imágenes pesadas en `/public` por versiones más ligeras.

### Corregido
- **Seguridad Admin**: Agregada pantalla de login a `admin.html`. Ahora requiere contraseña para acceder al panel de gestión de productos. El contenido admin está oculto hasta autenticación exitosa.
- **Separación de Capas**: Eliminado script inline de `index.html`. Lógica de agro-monitor movida a `main.js` con función `initAgroMonitor()`.
- **Hardcode API**: Corregido valor "65%" hardcodeado. Ahora usa `data.humedad` y `data.estado` reales del endpoint `/api/status`.

## [0.1.1] - 2026-03-20

### Mejorado
- **Organización de Configuración**: Movidas constantes de WhatsApp desde `main.js` a módulo `config.js`. El número y mensaje de WhatsApp ahora viven en un objeto de configuración estructurado, separando configuración de lógica de presentación.
- **Arquitectura de Datos**: Separación de datos de productos de la lógica de presentación. Movidos desde `main.js` hardcodeado a módulo dedicado `data/products.js`.
- **Refactor de Activos**: Reubicación de imágenes a `/public/images/` para optimizar la carga y organización.
- **Experiencia de Usuario (UX)**: Implementación de enlace de WhatsApp inteligente con mensaje personalizado para "Enrique".
- **SEO y Móvil**: Inclusión de meta tags (`description`, `theme-color`) y validación de `viewport`.
- **Arquitectura Híbrida**: Documentación de la separación de capas (Netlify/Supabase/Local) y creación de `DEPLOYMENT.md`.
- **Limpieza**: Eliminación de código muerto (CSS no usado, scripts de prueba y archivos temporales/borradores).

### Corregido
- **CSS DRY**: Eliminación de `@keyframes fadeIn` duplicado. Aparecía en líneas 121 y 314 con idénticos valores.
- **CSS DRY**: Eliminación de bloques `.hero` y `.hero::after` duplicados. Código repetido en líneas ~90-110 y ~115-135.
- **CSS Muerto**: Eliminadas clases no utilizadas `.sensor-card`, `.sensor-label`, `.sensor-status`, `.status-optimal`, `.glitch-title`.
- **Dependencias**: Movido `qrcode` de `dependencies` a `devDependencies` ya que se usa solo en cliente via Vite, no en servidor Node.
- **Validación de API**: Agregada validación de entrada en POST `/api/sensor`. Antes `name` y `value` se usaban directamente sin verificar.
- **Seguridad XSS**: Eliminación de interpolación directa en innerHTML. Implementado DOM manipulation seguro con `textContent` y `escapeHtml()`.
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

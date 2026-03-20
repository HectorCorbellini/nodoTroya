# NODO NUEVA TROYA - Plataforma Técnica

## 🌿 Concepto Operativo
**Nodo Nueva Troya** es un proyecto de validación de mercado y prototipado tecno-rural situado en Montevideo, Uruguay. Este repositorio contiene la infraestructura técnica para la gestión del catálogo digital y la comunicación directa con la red de vecinos a través de códigos QR y WhatsApp.

Basado en la **"Táctica del Nodo de Investigación"**, este desarrollo prioriza la discreción operativa y el vínculo directo, eliminando la necesidad de infraestructura comercial tradicional inmediata.

## 🚀 Características Técnicas
- **Catálogo Digital Premium**: Interfaz web responsiva construida con Vite, Vanilla JS y CSS, diseñada con una estética "Tecno-Rural".
- **Generación Dinámica de QR**: Integración con WhatsApp para contacto directo y consulta de catálogo privado.
- **Visualización de Activos**: Sección dedicada para material de comunicación (Afiches y Volantes).
- **Herramientas de Impresión**: Script especializado para generar códigos QR de alta resolución listos para imprimir en soportes físicos (madera, papel).

## 🛠️ Tecnologías Utilizadas
- **Frontend**: Vite.js, JavaScript (ES6+), Vanilla CSS.
- **Librerías**: `qrcode` para la generación de códigos.
- **Diseño**: Tipografía Outfit y Playfair Display, paleta de colores inspirada en la agroecología tecnológica.

## 🌐 Acceso Público (Túnel)
Para que los vecinos puedan acceder al catálogo desde la calle mediante el código QR, se recomienda usar un "túnel" desde la HP EliteBook:

1. **Vía ngrok**: `ngrok http 5173`
2. **Vía LocalTunnel**: `lt --port 5173`

## 🌿 Arquitectura Híbrida (Cloud-Local)
Para garantizar la soberanía de los datos y la disponibilidad 24/7, el sistema se divide en tres capas independientes:
1.  **Frontend (Netlify)**: El "Portal Público" que ven los vecinos. Siempre online y escalable.
2.  **Base de Datos (Supabase)**: El "Punto de Encuentro" en la nube donde se sincronizan los datos de los sensores en tiempo real.
3.  **Orquestador (HP EliteBook)**: El "Cerebro Local" (`server.js`) que recolecta datos físicos y los empuja a la nube. **Nota: Este servidor no corre en Netlify, es exclusivo para el nodo físico.**

## 🚀 Modos de Ejecución
Este proyecto tiene dos formas de operar que conviven armónicamente:

### 1. Modo Desarrollo/Local (Orquestador)
Para recibir datos de sensores y validar cambios rápidamente:
- `npm run dev`: Inicia Vite para el frontend.
- `node server.js`: Inicia el orquestador local en el puerto 3000.

### 2. Modo Producción (Portal del Vecino)
El despliegue final en **Netlify** es puramente estático (`/dist`). **Netlify ignora el `server.js`**; la comunicación con los sensores ocurre de forma asíncrona a través de Supabase.
Para que el sitio esté disponible 24/7 aunque la laptop esté apagada, consulta la **[Guía de Despliegue (DEPLOYMENT.md)](./DEPLOYMENT.md)**.

## 🗄️ Base de Datos (Supabase)
Para que los sensores funcionen, crea una tabla llamada `sensors` en Supabase con esta estructura:
- `name`: text (Ej: "humidity")
- `value`: int4 (Ej: 65)
- `updated_at`: timestamp (default: now())

Activa **Realtime** en la tabla `sensors` para que los cambios se reflejen al instante en el celular del vecino.

## 📋 Requisitos Previos
- Node.js (v18 o superior)
- npm (v9 o superior)

## 📦 Instalación y Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```


## 🌿 Servidor Unificado (Local)
Para correr el sitio y recibir datos de sensores desde la HP EliteBook:

1. **Configurar Entorno**:
   Copia `.env.example` a `.env` y rellena con tus credenciales de Supabase.
2. **Iniciar Servidor**:
   ```bash
   npm start
   ```
3. **Prueba de Sensores (CURL)**:
   ```bash
   curl -X POST http://localhost:3000/api/sensor \
     -H "Content-Type: application/json" \
     -H "x-api-key: TU-SECRETO" \
     -d '{"name": "humidity", "value": 72}'
   ```

## 📂 Estructura del Proyecto
- `index.html`: Web para los vecinos (Netlify).
- `server.js`: Recibe datos de sensores locales (Node.js).
- `supabase.js`: Cliente de base de datos para el frontend.
- `public/`: Assets estáticos para el despliegue cloud.

---
**Nodo Nueva Troya** - *Soberanía Alimentaria & Tecnología del Futuro*

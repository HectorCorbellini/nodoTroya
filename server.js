import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { supabase } from './supabase.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Middleware: Prevención de Caché (Prototipe Phase)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});


// --- RUTAS DE API ---
// Se registran antes que los archivos estáticos para evitar interferencias

// API: Sistema Status (Vibe Nueva Troya)
app.get('/api/status', async (req, res) => {
    // Protección contra fallos de configuración: Modo Offline
    if (!supabase) {
        return res.json({
            sistema: "Nodo Nueva Troya (Modo Offline)",
            humedad: "Dato no disponible",
            error: "Base de datos no configurada localmente"
        });
    }

    try {
        const { data, error } = await supabase
            .from('sensors')
            .select('value')
            .eq('name', 'humidity')
            .single();

        if (error) throw error;

        res.json({
            sistema: "Nodo Nueva Troya",
            estado: "Activo",
            humedad: data ? `${data.value}%` : "No disponible",
            fecha: new Date().toLocaleTimeString()
        });
    } catch (err) {
        console.error('Error en /api/status:', err.message);
        res.status(500).json({ error: "Error de conexión con sensores" });
    }
});

// API: Recepción de Datos (Local ESP32)
const API_SECRET = process.env.ORCHESTRATOR_SECRET;
app.post('/api/sensor', async (req, res) => {
    if (!supabase) {
        return res.status(503).json({ error: 'Servicio en modo offline (DB no configurada)' });
    }

    const apiKey = req.headers['x-api-key'];
    const { name, value } = req.body;

    if (!apiKey || apiKey !== API_SECRET) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    const { error } = await supabase
        .from('sensors')
        .update({ value, updated_at: new Date() })
        .eq('name', name);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ status: 'ok', msg: `Sensor ${name} actualizado` });
});

// --- ARCHIVOS ESTÁTICOS ---
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
    console.log(`\n🌿 NODO NUEVA TROYA - Unificado`);
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📂 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}\n`);
});

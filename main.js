import QRCode from 'qrcode';
import { supabase } from './supabase.js';

// CONFIGURATION
const WHATSAPP_NUMBER = '59891633183'; // Updated
const WHATSAPP_MESSAGE = 'Hola Enrique, vengo del QR de Nueva Troya. Me interesa conocer el catálogo de productos.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// DOM ELEMENTS
const whatsappBtn = document.getElementById('whatsapp-link');
const whatsappCtaBtn = document.getElementById('whatsapp-cta-link');
const catalogGrid = document.getElementById('catalog-grid');
const tabBtns = document.querySelectorAll('.tab-btn');

// PRODUCTS DATA
const products = [
    {
        id: 1,
        name: 'Jugos Naturales',
        category: 'alimentos',
        price: 'Consultar Catálogo',
        img: 'images/muestra_Jugos.png',
        description: 'Prensado en frío, origen natural y selección de estación.'
    },
    {
        id: 2,
        name: 'Arroz de Selección',
        category: 'alimentos',
        price: 'Consultar Catálogo',
        img: 'images/muestra_Arroz.png',
        description: 'Grano de alta calidad, seleccionado para soberanía campesina.'
    },
    {
        id: 3,
        name: 'Sensor de Humedad V1',
        category: 'tecnologia',
        price: 'Prototipo',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500',
        description: 'Sistema de monitoreo visual para huertas residenciales.'
    },
    {
        id: 4,
        name: 'Controlador de Gallinero',
        category: 'tecnologia',
        price: '$2500',
        img: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=80&w=500',
        description: 'Automatización de puerta y luz.'
    },
    {
        id: 5,
        name: 'Afiche de Bienvenida',
        category: 'grafica',
        price: 'Gratis (Red de Vecinos)',
        img: 'images/nuevaTroya_AFICHE.png',
        description: 'Diseño en madera con el QR de contacto directo.'
    },
    {
        id: 6,
        name: 'Volante Barrial',
        category: 'grafica',
        price: 'Bajo costo',
        img: 'images/nuevaTroya_VOLANTE.png',
        description: 'Material para distribución local y catálogo privado.'
    }
];

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initWhatsApp();
    renderProducts('alimentos');
    initTabs();
    initSensors();
});

async function initSensors() {
    const sensorValueEl = document.querySelector('.sensor-value');
    if (!sensorValueEl) return;

    // 1. Initial Fetch
    if (supabase) {
        const { data, error } = await supabase
            .from('sensors')
            .select('value')
            .eq('name', 'humidity')
            .single();

        if (data) {
            sensorValueEl.textContent = data.value;
        } else {
            console.error('Error fetching sensor data:', error);
        }

        // 2. Real-time Subscription
        supabase
            .channel('public:sensors')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sensors' }, payload => {
                if (payload.new.name === 'humidity') {
                    sensorValueEl.textContent = payload.new.value;
                    animateSensorUpdate(sensorValueEl);
                }
            })
            .subscribe();
    } else {
        console.log('Using placeholder sensor data (Supabase not configured).');
    }
}

function animateSensorUpdate(el) {
    el.style.transform = 'scale(1.2)';
    el.style.color = '#ffa000';
    setTimeout(() => {
        el.style.transform = 'scale(1)';
        el.style.color = '';
    }, 500);
}

function initWhatsApp() {
    if (whatsappBtn) {
        whatsappBtn.href = WHATSAPP_URL;
    }
    if (whatsappCtaBtn) {
        whatsappCtaBtn.href = WHATSAPP_URL;
    }
}


function getCategoryLabel(category) {
    const labels = {
        'alimentos': 'Soberanía Alimentaria',
        'tecnologia': 'Hardware Libre',
        'grafica': 'Comunicación'
    };
    return labels[category] || category;
}

function createProductCard(product) {
    const categoryLabel = getCategoryLabel(product.category);
    return `
    <div class="product-card">
        <div class="product-img" style="background-image: url('${product.img}')"></div>
        <div class="product-info">
            <div class="product-category">${categoryLabel}</div>
            <h3 class="product-name">${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price}</div>
        </div>
    </div>
    `;
}

function renderProducts(category) {
    if (!catalogGrid) return;

    const filteredProducts = products.filter(p => p.category === category);
    catalogGrid.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
}

function initTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.tab);
        });
    });
}

import QRCode from 'qrcode';
import { supabase } from './supabase.js';
import { products } from './data/products.js';
import { config } from './config.js';

// CONFIGURATION
const WHATSAPP_URL = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`;

// SECURITY UTILITIES
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// DOM ELEMENTS
const whatsappBtn = document.getElementById('whatsapp-link');
const whatsappCtaBtn = document.getElementById('whatsapp-cta-link');
const catalogGrid = document.getElementById('catalog-grid');
const tabBtns = document.querySelectorAll('.tab-btn');


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
    
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const img = document.createElement('div');
    img.className = 'product-img';
    img.style.backgroundImage = `url('${escapeHtml(product.img)}')`;
    
    const info = document.createElement('div');
    info.className = 'product-info';
    
    const category = document.createElement('div');
    category.className = 'product-category';
    category.textContent = categoryLabel;
    
    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;
    
    const description = document.createElement('p');
    description.textContent = product.description;
    
    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = product.price;
    
    info.appendChild(category);
    info.appendChild(name);
    info.appendChild(description);
    info.appendChild(price);
    
    card.appendChild(img);
    card.appendChild(info);
    
    return card;
}

function renderProducts(category) {
    if (!catalogGrid) return;

    const filteredProducts = products.filter(p => p.category === category);
    catalogGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        catalogGrid.appendChild(createProductCard(product));
    });
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

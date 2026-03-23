import { createClient } from '@supabase/supabase-js';
import { products } from './data/products.js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        id: null,
        stock: null
    };

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--id' && args[i + 1]) {
            options.id = parseInt(args[i + 1]);
            i++;
        } else if (args[i] === '--stock' && args[i + 1]) {
            options.stock = parseInt(args[i + 1]);
            i++;
        }
    }

    return options;
}

async function syncProducts() {
    console.log('🔄 Sincronizando productos desde data/products.js...\n');

    const productsToSync = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        stock: p.stock || 0,
        honest_label: p.description
    }));

    console.log(`📦 Productos a sincronizar: ${productsToSync.length}`);
    productsToSync.forEach(p => console.log(`  - ${p.name} (${p.category})`));

    const { data, error } = await supabase
        .from('products')
        .upsert(productsToSync, { onConflict: 'id' })
        .select();

    if (error) {
        console.error('\n❌ Error al sincronizar:', error.message);
        process.exit(1);
    }

    console.log(`\n✅ ${data.length} productos sincronizados exitosamente`);
    
    const { data: allProducts } = await supabase
        .from('products')
        .select('*')
        .order('id');
    
    console.log('\n📋 Productos en base de datos:');
    allProducts.forEach(p => {
        console.log(`  [${p.id}] ${p.name} - Stock: ${p.stock}`);
    });
}

async function updateStock(id, stock) {
    console.log(`🔄 Actualizando stock del producto id:${id} a ${stock}...\n`);

    const { data, error } = await supabase
        .from('products')
        .update({ stock })
        .eq('id', id)
        .select();

    if (error) {
        console.error('❌ Error al actualizar stock:', error.message);
        process.exit(1);
    }

    console.log('✅ Stock actualizado:');
    console.log(`  [${data[0].id}] ${data[0].name} - Stock: ${data[0].stock}`);
}

async function main() {
    const options = parseArgs();

    if (options.id !== null && options.stock !== null) {
        await updateStock(options.id, options.stock);
    } else {
        await syncProducts();
    }
}

main();

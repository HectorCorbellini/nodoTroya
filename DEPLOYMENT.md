# Guide: Deploying NODO_TROYA to the Cloud

This guide explains how to take the application from your "HP EliteBook" to a 24/7 online presence using Netlify and Supabase.

> [!IMPORTANT]
> **Netlify es para el Sitio Estático.** El archivo `server.js` es exclusivo para tu **Orquestador Local** (el puente físico) y NO se despliega en Netlify.

## 1. Supabase Setup (Database)
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Under **SQL Editor**, run the following query to create your sensor table:
   ```sql
   create table sensors (
     name text primary key,
     value int4,
     updated_at timestamp default now()
   );
   
   -- Insert initial dummy data
   insert into sensors (name, value) values ('humidity', 65);
   ```
3. Go to **Table Editor** -> `sensors` -> **Realtime** (Enable the toggle) to allow live updates on the phone.
4. Go to **Project Settings** -> **API** and copy:
   - `Project URL` (This is your `VITE_SUPABASE_URL`)
   - `anon public` Key (This is your `VITE_SUPABASE_ANON_KEY`)

## 2. Netlify Setup (Frontend)
1. Connect this repository to your [Netlify](https://netlify.com) account.
2. During the setup, go to **Site configuration** -> **Environment variables**.
3. Add the two variables you copied from Supabase (must use `VITE_` prefix for frontend access):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Your site will be live at a URL like `https://nodo-nueva-troya.netlify.app`.

On your HP EliteBook (Linux Mint), update your `.env` file with the standard Node.js names:
```bash
# .env
SUPABASE_URL=https://pxmjbpwfiodhblrezhbm.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY_DE_SUPABASE
ORCHESTRATOR_SECRET=TU_CLAVE_PARA_EL_ESP32
PORT=3000
```
Now, when you run `node server.js`, the local sensors will push data to the remote cloud, and they will appear instantly on the neighbor's phone.

## 🌿 Success!
Your "Táctica del Nodo" is now fully digital and resilient!

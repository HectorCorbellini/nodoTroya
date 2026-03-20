# Guide: Deploying NODO_TROYA to the Cloud

This guide explains how to take the application from your "HP EliteBook" to a 24/7 online presence using Netlify and Supabase.

> [!IMPORTANT]
> **Netlify es para el Sitio Estático.** El archivo `server.js` es exclusivo para tu **Orquestador Local** (el puente físico) y NO se despliega en Netlify.

## 1. Supabase Setup (Database)
- [x] **Create Project**: Go to [supabase.com](https://supabase.com) and create a new project.
- [x] **Initialize Schema**: Run the SQL query to create the `sensors` table.
   <details>
   <summary>Ver SQL Script</summary>

   ```sql
   create table sensors (
     name text primary key,
     value int4,
     updated_at timestamp default now()
   );
   insert into sensors (name, value) values ('humidity', 65);
   ```
   </details>
- [ ] **Enable Realtime**: Go to **Table Editor** -> `sensors` -> **Realtime** (Enable the toggle).
- [x] **Get API Keys**: Copy `Project URL` and `anon public` key.

## 2. Netlify Setup (Frontend)
- [ ] **Connect Repo**: Connect this repository to your [Netlify](https://netlify.com) account.
- [ ] **Env Vars**: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify settings.
- [ ] **Deploy**: Click **Deploy** and get your public URL.

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

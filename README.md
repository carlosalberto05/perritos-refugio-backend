# 🐶 Guía Completa de Conexión Backend + Frontend (Huellitas) 🐾

¡Hola! Es un gusto saludarte. Entiendo perfectamente por lo que estás pasando; aprender a conectar el backend con el frontend es uno de los pasos más emocionantes (y a veces frustrantes) en el desarrollo web. 

Este README está diseñado para ser tu **mapa definitivo**. He analizado tu frontend y tu backend para darte los pasos exactos que necesitas para llevar tu aplicación a nivel profesional, usando **Prisma**, **Supabase**, **Render** y las mejores prácticas.

---

## 📋 Índice
1. [El Concepto: ¿Cómo se comunican?](#1-el-concepto-cómo-se-comunican)
2. [Paso 1: Configuración de la Base de Datos (Supabase)](#2-paso-1-configuración-de-la-base-de-datos-supabase)
3. [Paso 2: Configuración de Prisma y SQLite (Local)](#3-paso-2-configuración-de-prisma-y-sqlite-local)
4. [Paso 3: Lógica del Backend - Consumiendo la API](#4-paso-3-lógica-del-backend---consumiendo-la-api)
5. [Paso 4: Conexión desde el Frontend (TanStack Query)](#5-paso-4-conexión-desde-el-frontend-tanstack-query)
6. [Paso 5: Despliegue en Producción (Render + Supabase)](#6-paso-5-despliegue-en-producción-render--supabase)
7. [Variables de Entorno (.env)](#7-variables-de-entorno-env)
8. [Temas Críticos: CORS y Middlewares](#8-temas-críticos-cors-y-middlewares)

---

## 1. El Concepto: ¿Cómo se comunican?
Actualmente, tu frontend usa un archivo `db.json` local. Cuando lo subes a Vercel, ese archivo es "estático" y no funciona como una base de datos real.

**El nuevo flujo será:**
1. El **Frontend** (React en Vercel) hace una petición `GET` a tu **Backend**.
2. El **Backend** (Express en Render) recibe la petición.
3. El **Backend** le pide a **Prisma** que busque los datos.
4. **Prisma** consulta la **Base de Datos** (Postgres en Supabase o SQLite local).
5. El dato regresa por el mismo camino hasta el frontend.

---

## 2. Paso 1: Configuración de la Base de Datos (Supabase)
Para producción, necesitas una base de datos real (PostgreSQL). Supabase es excelente para esto.

1. Ve a [Supabase](https://supabase.com/) y crea un proyecto.
2. En la configuración del proyecto, busca **Database Settings**.
3. Copia la **Connection String** (URI). Se ve algo así:  
   `postgresql://postgres:[PASSWORD]@db.[ID].supabase.co:5432/postgres`
4. **IMPORTANTE:** En Prisma, para Supabase, solemos usar el modo `transaction` o añadir `?pgbouncer=true` si es necesario, pero para empezar, la URI normal funciona bien.

---

## 3. Paso 2: Configuración de Prisma y SQLite (Local)
Para trabajar en local sin gastar recursos ni internet, usamos **SQLite**. Es un archivo `.db` que vive en tu carpeta.

### Instalación de Dependencias
Asegúrate de tener esto en tu backend:
```bash
npm install @prisma/client
npm install -D prisma
```

### El Esquema (schema.prisma)
Ya he actualizado tu archivo `prisma/schema.prisma`. Ahora tiene la estructura correcta para tus perritos y refugios.

### Comandos Clave:
Cada vez que cambies el esquema, corre:
```bash
# Genera el cliente de Prisma (el código que usas para consultar)
npx prisma generate

# Crea las tablas en tu base de datos local
npx prisma migrate dev --name init
```

---

## 4. Paso 3: Lógica del Backend - Consumiendo la API
He organizado tu código en **Controladores**, **Servicios** y **Repositorios**. Esta es la "Arquitectura Profesional".

- **Repositorio:** Habla directamente con Prisma.
- **Servicio:** Contiene la lógica (reglas de negocio).
- **Controlador:** Recibe la petición HTTP y responde.

### Ejemplo de Endpoint para obtener perritos:
`GET /api/perritos` devuelve:
```json
{
  "success": true,
  "message": "Perritos recuperados exitosamente",
  "data": [
    { "id": "uuid", "name": "Luna", "breed": "Mestizo", ... }
  ]
}
```

---

## 5. Paso 4: Conexión desde el Frontend (TanStack Query)
En tu frontend, ya usas TanStack Query. Aquí te muestro cómo conectar el API real.

### Crear un servicio de API
Crea un archivo `src/services/api.ts`:
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

export default api;
```

### Usar el Hook en tu Componente
En tu página de Home o donde muestres los perritos:
```typescript
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useDogs = () => {
  return useQuery({
    queryKey: ['dogs'],
    queryFn: async () => {
      const { data } = await api.get('/perritos');
      return data.data; // Accedemos a .data porque el backend lo envuelve así
    },
  });
};
```

---

## 6. Paso 5: Despliegue en Producción (Render + Supabase)
1. **Render:** Crea un nuevo "Web Service".
2. Conecta tu repo de GitHub.
3. **Build Command:** `npm install && npm run build && npx prisma generate`
4. **Start Command:** `npm start`
5. **Variables de Entorno:** Aquí es donde ocurre la magia.

---

## 7. Variables de Entorno (.env)
Las variables de entorno permiten que la misma app use una base de datos en local y otra en producción **sin cambiar el código**.

### En Local (`.env` del backend):
```env
PORT=3001
DATABASE_URL="file:./dev.db"
NODE_ENV=development
```

### En Render (Configuración manual en el dashboard):
```env
PORT=10000
DATABASE_URL="postgresql://user:pass@supabase-url.com:5432/postgres"
NODE_ENV=production
```

### En Vercel (`.env` del frontend):
```env
VITE_API_URL="https://tu-api-en-render.onrender.com/api"
```

---

## 8. Temas Críticos: CORS y Middlewares
- **CORS:** Ya lo configuré en tu `server.ts`. Es lo que permite que el puerto 5173 (frontend) hable con el 3001 (backend). En producción, deberías especificar tu dominio de Vercel por seguridad.
- **Zod:** Lo usamos para validar que la información que llega al backend sea correcta.
- **Helmet:** Agrega capas de seguridad a tus headers HTTP.

---

## 🚀 ¿Qué sigue?
1. **Poblar la base de datos:** He dejado la estructura lista. Puedes usar el comando `npx prisma studio` para ver tu base de datos local y agregar perritos manualmente para probar.
2. **Conectar el frontend:** Sigue el ejemplo del Paso 4.
3. **Desplegar:** ¡Sube tus cambios y configura las variables en Render!

Si tienes dudas, ¡estoy aquí para ayudarte a que este proyecto sea el mejor de tu portfolio! 🐶✨

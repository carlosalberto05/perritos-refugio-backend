# 🎓 Guía Maestra: Conectando Backend y Frontend Profesional 🐾

¡Hola! Esta guía es tu material de estudio. Aquí he documentado **paso a paso** cada decisión, cada archivo y cada línea de código que implementé para transformar tu backend en una solución profesional lista para producción.

---

## 🏗️ 1. El Diseño de la Base de Datos (Prisma Schema)

**Archivo:** `prisma/schema.prisma`

**Lo que hice:**  
Analicé tu archivo `db.json` del frontend para ver qué datos estabas usando realmente. Traduje esa estructura a un modelo de datos relacional.

**Decisión Técnica:**  
Cambié los nombres a **Inglés** (`Dog`, `Shelter`, `SuccessStory`). ¿Por qué? Porque en el mundo profesional, el código se escribe en inglés para ser universal, aunque el contenido (nombres de perritos) sea en español.

```prisma
model Dog {
  id             String  @id @default(uuid())
  name           String
  age            String
  // ... más campos
  shelterId      String?
  shelter        Shelter? @relation(fields: [shelterId], references: [id])
}
```
**Explicación:** Usé `uuid()` para los IDs en lugar de números autoincrementables. Esto es mejor para seguridad y escalabilidad en bases de datos distribuidas.

---

## 💉 2. El "Sembrado" de Datos (Seeding)

**Archivo:** `prisma/seed.ts`

**Lo que hice:**  
Creé un script que "lee" tu archivo `db.json` del frontend y lo inserta automáticamente en la base de datos local.

**Decisión Técnica:**  
Hice que el script limpie la base de datos antes de insertar (`deleteMany`). Esto te permite correr el script varias veces sin duplicar datos mientras practicas.

```typescript
// Leemos el JSON del frontend
const rawData = fs.readFileSync('../perritos-refugio-frontend/db.json', 'utf-8');
const data = JSON.parse(rawData);

// Insertamos perritos vinculándolos con sus refugios
for (const dog of data.dogs) {
  await prisma.dog.create({
    data: { ...dog, shelterId: dog.shelter?.id }
  });
}
```

---

## 📂 3. Arquitectura de Capas (Refactorización)

**Archivos movidos/renombrados:**  
- `perrito.repository.ts` ➡️ `dog.repository.ts`
- `perrito.service.ts` ➡️ `dog.service.ts`
- `perrito.controller.ts` ➡️ `dog.controller.ts`

**Decisión Técnica:**  
Mantuve el patrón **Repositorio -> Servicio -> Controlador**.
1. **Repository:** Es el único que "sabe" que usamos Prisma.
2. **Service:** Es el "cerebro" donde irían las reglas (ej: "no se puede adoptar un perro si ya está reservado").
3. **Controller:** Solo se encarga de recibir la petición HTTP y dar una respuesta bonita.

**Código en el Repositorio:**
```typescript
export class DogRepository {
  async findAll() {
    // Aquí usamos el ".include" para que el perrito traiga la info de su refugio
    return prisma.dog.findMany({
      include: { shelter: true },
    });
  }
}
```

---

## 🌉 4. El Puente (Frontend Config)

**Archivo:** `perritos-refugio-frontend/src/api/config.ts`

**Lo que hice:**  
Cambié la URL base para que todas las peticiones lleven el prefijo `/api`.

**Decisión Técnica:**  
En el backend, registramos las rutas bajo `/api/dogs` y `/api/shelters`. Esto es una convención profesional para separar las rutas de la API de posibles rutas de archivos estáticos o vistas.

```typescript
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api';
```

---

## 🛠️ 5. Automatización (Scripts)

**Archivo:** `package.json`

**Lo que hice:**  
Agregué scripts para que no tengas que recordar comandos largos.

```json
"scripts": {
  "prisma:migrate": "prisma migrate dev",
  "prisma:seed": "node --loader ts-node/esm prisma/seed.ts"
}
```

---

## 🧠 Lecciones Importantes para Estudiar:

1. **Variables de Entorno:** El archivo `.env` es el que le dice al código dónde está la base de datos. En local usamos `file:./dev.db` (SQLite), pero en producción cambiaremos esa línea por la URL de Supabase **sin tocar ni una línea de código JS**.
2. **CORS:** Sin el middleware `cors()` en `server.ts`, el navegador bloquearía las peticiones del frontend por seguridad. ¡Es vital!
3. **Tipado:** Al usar Prisma, TypeScript sabe exactamente qué campos tiene un `Dog`. Si intentas acceder a `dog.raza` en lugar de `dog.breed`, el editor te avisará antes de que rompas la app.

### 💡 Tarea de estudio sugerida:
Abre el archivo `src/core/repositories/dog.repository.ts` y compáralo con el anterior que devolvía un array vacío `[]`. Mira cómo la librería Prisma simplifica las consultas a la base de datos. 

¡Sigue dándole duro al estudio, vas por excelente camino! 🚀🐶

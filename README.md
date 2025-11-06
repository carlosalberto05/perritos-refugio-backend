# 🐶 Perritos Refugio Backend (API) 🐾

¡Bienvenido al servicio API de Huellitas! Este proyecto es el núcleo de la aplicación, encargado de gestionar toda la lógica de negocio, el acceso a la base de datos y la orquestación de la API RESTful.

## 🚀 Stack Tecnológico

| Herramienta       | Descripción                   |
| :---------------- | :---------------------------- | ----------------------------------------------------------------------------- |
| **Framework**     | Node.js (Express)             | Servidor ligero y eficiente para manejar las peticiones HTTP.                 |
| **Lenguaje**      | TypeScript                    | Tipado estricto para calidad de código y detección temprana de errores.       |
| **Base de Datos** | PostgreSQL                    | BD Relacional robusta, ideal para datos estructurados de refugios y perritos. |
| **ORM**           | Prisma                        | ORM moderno que genera un cliente de base de datos tipado y seguro.           |
| **Arquitectura**  | Patrón de Repositorio (Capas) | Separa la lógica de negocio del acceso a datos, mejorando la testabilidad.    |
| **Pruebas**       | Jest + Supertest              | Jest para pruebas unitarias. Supertest para pruebas de integración de la API. |

## 📐 Arquitectura del Proyecto (Patrón de Repositorio)

Utilizamos una arquitectura de Capas (Layers) para garantizar el _deacoplamiento_ y facilitar las pruebas:

| Capa/Carpeta    | Patrón            | Rol (Función Principal)                                                                             |
| :-------------- | :---------------- | :-------------------------------------------------------------------------------------------------- |
| `controllers/`  | Controlador (API) | Recibe la petición HTTP, valida el cuerpo y llama al servicio. **No hay lógica de negocio.**        |
| `services/`     | Lógica de Negocio | El "cerebro". Aplica las reglas de negocio (ej. verificar adopción). Llama al Repositorio.          |
| `repositories/` | Acceso a Datos    | Encapsula y aísla la lógica de la BD (Prisma). Contiene métodos como `getAllDogs()`, `createDog()`. |

## ⚙️ Desarrollo Local

### Requisitos

- Node.js (versión 18.x o superior)
- Docker (Para levantar la base de datos PostgreSQL)

### 📦 Primeros Pasos

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Configurar Variables de Entorno:**
    Crea el archivo `.env` basado en `.env.example` y añade la URL de la base de datos.

3.  **Ejecutar en modo Desarrollo (con watch):**
    ```bash
    npm run dev
    ```
    El servidor estará disponible en `http://localhost:3001`.

### 🧪 Pruebas

```bash
# Ejecutar todas las pruebas unitarias y de integración
npm run test

# Ejecutar pruebas en modo vigilancia
npm run test:watch

# Generar reporte de cobertura de código
npm run test:cov
```

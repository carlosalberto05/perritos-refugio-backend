# 🐶 Huellitas - Backend API 🐾

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-20-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.0-blue)

> **El motor que impulsa la adopción de huellitas.**  
> Este es el servicio core de la plataforma Huellitas, encargado de gestionar la lógica de negocio, la persistencia de datos y proveer una API REST segura para el frontend y la app móvil.

---

## ✨ Características Principales

- **🏗️ Arquitectura de Capas:** Código organizado mediante el patrón de **Repositorio/Servicio** para una máxima escalabilidad y testabilidad.
- **🔐 Seguridad Integrada:** Implementación de **Helmet**, **CORS** y validación de datos con **Zod**.
- **📊 Base de Datos Flexible:** Configurado con **Prisma ORM** y **SQLite** para un desarrollo local rápido y sencillo.
- **🛠️ Calidad de Código:** Integración con **ESLint**, **Prettier** y **Husky** para mantener un estándar de código premium.
- **🚀 API RESTful:** Endpoints estandarizados con respuestas consistentes y manejo global de errores.

---

## 🛠️ Stack Tecnológico

El backend está diseñado para ser ligero, rápido y fácil de mantener:

| Categoría | Tecnología | Descripción |
|-----------|------------|-------------|
| **Framework** | ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Servidor web minimalista y veloz. |
| **Lenguaje** | ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white) | Tipado estricto para evitar errores en tiempo de ejecución. |
| **ORM** | ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white) | Modelado de datos moderno y tipado. |
| **Base de Datos** | ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white) | BD local embebida para simplicidad en desarrollo. |
| **Validación** | ![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod&logoColor=white) | Validación de esquemas de datos segura. |
| **Testing** | ![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white) | Marco de pruebas robusto. |

---

## 🏗️ Arquitectura del Proyecto (Patrón de Capas)

Seguimos una estructura modular donde cada archivo tiene una responsabilidad única:

```bash
src/
├── 📂 api/                 # Capa de Interfaz (HTTP)
│   ├── 📂 controllers/     # Orquestadores de peticiones
│   ├── 📂 middlewares/     # Filtros (Auth, Error Handling, Logs)
│   ├── 📂 routes/          # Definición de endpoints
│   └── 📂 utils/           # Ayudantes (ApiResponse, etc.)
│
├── 📂 core/                # Capa de Dominio y Datos
│   ├── 📂 services/        # Lógica de negocio (El "cerebro")
│   └── 📂 repositories/    # Acceso a datos (Habla con Prisma)
│
├── 📂 types/               # Definiciones de tipos TS globales
└── server.ts               # Punto de entrada de la aplicación
```

---

## 🚀 Comenzando

Sigue estos pasos para levantar tu servidor local en minutos.

### Prerrequisitos
*   Node.js (v20 o superior)
*   npm

### Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/carlosalberto05/perritos-refugio-backend.git
    cd perritos-refugio-backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz (basado en `.env.example`):
    ```env
    PORT=3001
    DATABASE_URL="file:./dev.db"
    ```

4.  **Preparar la base de datos (SQLite):**
    ```bash
    npm run prisma:generate
    npm run prisma:migrate
    ```

5.  **Iniciar el servidor:**
    ```bash
    npm run dev
    ```

¡Listo! La API estará disponible en [http://localhost:3001](http://localhost:3001). Puedes probar el estado en `/health`.

---

## 🧪 Pruebas y Calidad

Contamos con herramientas automáticas para asegurar que el código siempre brille:

```bash
# Ejecutar Linter
npm run lint

# Formatear código
npm run format

# Ejecutar Tests
npm run test
```

---

Hecho con ❤️ por **Carlos Alberto Lira** 🐾.

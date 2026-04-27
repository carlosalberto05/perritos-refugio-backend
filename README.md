# 🐾 Perritos Refugio - Backend API

[![CI Pipeline](https://github.com/carlosalberto05/perritos-refugio-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosalberto05/perritos-refugio-backend/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D.svg)](https://www.prisma.io/)

Este repositorio alberga el backend (API RESTful) para el sistema de administración y adopción de la plataforma **Perritos Refugio**, un refugio de perritos rescatados de la calle en México.

---

## 🏗️ Arquitectura y Tecnologías

El sistema está construido siguiendo buenas prácticas de desarrollo moderno, implementando una arquitectura de capas (Controladores, Servicios y Repositorios).

*   **Runtime & Framework:** Node.js, Express.js.
*   **Lenguaje core:** TypeScript.
*   **Bases de Datos:** PostgreSQL (Producción en Supabase) y SQLite (Desarrollo).
*   **ORM:** Prisma.
*   **Validación de Datos:** Zod.
*   **Testing:** Jest & Supertest.
*   **Seguridad:** Helmet & CORS.
*   **Calidad de Código y CI/CD:** ESLint, Prettier, Husky, Commitlint y GitHub Actions.

---

## 🚀 Guía de Inicialización (Local)

### 1. Requisitos Previos
* Node.js v20+
* Gestor de paquetes npm (v10 o superior recomendado)

### 2. Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/carlosalberto05/perritos-refugio-backend.git
cd perritos-refugio-backend
npm ci
```

### 3. Variables de Entorno

Duplica el archivo de ejemplo para configurar el entorno local:

```bash
cp .env.example .env.local
```

Asegúrate de que tus variables apunten al entorno SQLite local si deseas evitar una instancia en nube durante el desarrollo (revisa `.env.local` y los comentarios).

### 4. Base de Datos (Prisma)

Sincroniza el esquema de prisma en la base de datos de desarrollo y genera el SDK del cliente:

```bash
# Migrar la base de datos (crear tablas)
npm run prisma:migrate

# Ejecutar el seed (Poblar la base de datos con datos de prueba)
npm run prisma:seed
```

### 5. Iniciar el Servidor

```bash
# Modo desarrollo con recarga automática
npm run dev

# Compilar para producción y correr localmente
npm run build
npm start
```
La API estará disponible en `http://localhost:3001` (o el puerto definido en tus variables de entorno).

---

## 🌍 Entornos y Despliegue

### Producción (Render + Supabase)

El backend está configurado para ser desplegado eficientemente en [Render](https://render.com) junto a una base de datos PostgreSQL en [Supabase](https://supabase.com).

**Comandos relevantes para CI/CD y despliegue:**
*   **Build de Producción:** `npm run build:render`
*   **Start Command:** `npm run start:prod` (Este comando incluye la ejecución automática de la migración en Prisma y luego inicializa el servidor compilado).

---

## 🛠️ Entorno de Trabajo y Estándares

### CI/CD
Contamos con un pipeline en **GitHub Actions** (`ci.yml`) que garantiza el correcto funcionamiento en las ramas `main` y `develop`. El flujo valida linter, construcción y pruebas unitarias por cada Pull Request.

### Ganchos (Git Hooks) & Commits
Usamos **Husky** y **Commitlint** para asegurar que los mensajes de nuestros commits sigan la convención [Conventional Commits](https://www.conventionalcommits.org/).

### Contribución y Reporte de Fallos
Toda información acerca de los requerimientos de estructura en el código, el uso de las ramas (principal y características) y la generación de Pull Requests está concentrado en nuestra guía unificada.

👉 **Por favor, antes de crear un PR, revisa y sigue las instrucciones en nuestro documento [CONTRIBUTING.md](./CONTRIBUTING.md)**.

A la hora de enviar un Pull Request en GitHub, se cargará automáticamente la plantilla predeterminada ubicada en `.github/pull_request_template.md`. Sigue el checklist al interior.

---

## 📞 Soporte e Issues
Para problemas, fallos del sistema o nuevas peticiones, favor de generar un nuevo [Issue](../../issues) en GitHub describiendo adecuadamente el caso y adjuntando registros técnicos de ser posible. Revisa los [CODEOWNERS](./.github/CODEOWNERS) en caso de necesitar revisiones específicas de algún módulo.

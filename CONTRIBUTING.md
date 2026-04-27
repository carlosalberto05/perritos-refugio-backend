# 🐾 Guía de Contribución - Perritos Refugio Backend

¡Gracias por querer contribuir al proyecto! Aquí te explicamos cómo hacerlo correctamente.

---

## 🚀 Empezar

### Requisitos previos

- Node.js 20+
- npm o yarn
- Git

### Configuración inicial

```bash
# Clonar repositorio
git clone https://github.com/carlosalberto05/perritos-refugio-backend.git
cd perritos-refugio-backend

# Instalar dependencias
npm ci

# Copiar variables de entorno
cp .env.example .env.local

# Configurar Husky (pre-commits)
npm run prepare
```

---

## 🔀 Antes de hacer un PR

```bash
# 1. Actualiza tu rama local
git checkout develop
git pull origin develop

# 2. Crea rama de feature
git checkout -b feature/my-feature

# 3. Haz cambios y commits con formato convencional
git add .
git commit -m "feat(auth): add JWT token refresh"

# 4. Verifica que todo funciona
npm run lint
npm run test
npm run build

# 5. Push y crea PR
git push origin feature/my-feature
```

---

## 📝 Formato de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

### Tipos válidos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `refactor` | Cambios sin funcionalidad nueva |
| `test` | Tests |
| `chore` | Cambios en dependencias |
| `ci` | Cambios en CI/CD |

### Ejemplos

```bash
feat(dogs): add GET endpoint to list dogs
fix(prisma): handle null image URLs correctly
docs(README): update database setup instructions
refactor(auth): improve error handling
```

---

## ✅ Checklist de PR

Tu PR debe cumplir:

- ✅ Tests pasando (`npm run test`)
- ✅ Linting sin errores (`npm run lint`)
- ✅ Build exitoso (`npm run build`)
- ✅ Commits con mensajes convencionales
- ✅ Descripción clara del cambio
- ✅ Referencias a issues relacionados

---

## 🤝 Revisión de Código

- **`develop`**: Requiere 1 aprobación
- **`main`**: Requiere 2 aprobaciones

Los reviewers pueden solicitar cambios. Responde con nuevos commits (no hagas `force push`).

---

## 🐛 Reportar Bugs

1. Verifica que no exista un issue similar
2. Abre un issue con:
   - Descripción clara del bug
   - Pasos para reproducir
   - Resultado esperado vs actual
   - Versión de Node.js y SO

---

## 💬 Preguntas

Para preguntas, usa:

- Issues con etiqueta `question`
- Discussions (si están habilitadas)

---

## 📜 Licencia

Al contribuir, aceptas que tu código se distribuye bajo la licencia del proyecto.

¡Gracias por tu aporte! 🐾

# 📋 Políticas de Gobernanza del Repositorio

## Propósito

Este documento establece las reglas de contribución, revisión y despliegue para mantener la calidad, seguridad e integridad del proyecto **perritos-refugio-backend**.

---

## 1. Estrategia de Ramas

### Regla Fundamental: `develop` es la rama principal

> **IMPORTANTE**: En este proyecto, `develop` es la rama principal de trabajo. Las ramas `main` y `develop` **NUNCA** se tocan directamente. Todo el desarrollo se hace en ramas separadas creadas desde `develop`, y TODOS los cambios se mergean siempre a `develop`.

#### Flujo de trabajo obligatorio:

```
┌─────────────────────────────────────────────────────────────────┐
│  TODO nuevo cambio empieza desde develop                       │
│  TODO pull request apunta a develop                            │
│  TODO merge se hace a develop                                  │
│  main SOLO se toca para releases (después de develop)          │
└─────────────────────────────────────────────────────────────────┘
```

### Rama `main` (Producción)

- **Propósito**: Código estable y en producción
- **CUÁNDO TOCARLA**: Solo para releases正式es
- **Quién puede hacer merge**: Solo administradores
- **Requisitos**:
  - ✅ 2 aprobaciones de revisión obligatorias
  - ✅ Todos los checks CI/CD deben pasar
  - ✅ Branch up-to-date con `develop`
  - ✅ No se permiten pushes directos
  - ✅ Se requiere mensaje de commit convencional
  - ⚠️ **NUNCA hacer push directo a main**

### Rama `develop` (Staging/Pre-producción) - RAMA PRINCIPAL

- **Propósito**: Integración de nuevas características (rama principal de trabajo)
- **CUÁNDO TOCARLA**: Solo para sincronizar, nunca hacer push directo
- **Quién puede hacer merge**: Maintainers del proyecto
- **Requisitos**:
  - ✅ 1 aprobación de revisión obligatoria
  - ✅ Todos los checks CI/CD deben pasar
  - ✅ No se permiten pushes directos
  - ✅ Se requiere mensaje de commit convencional
  - ⚠️ **NUNCA hacer push directo a develop**

### Ramas de Características (feature/_, bugfix/_, etc.)

- ⚠️ **IMPORTANTE**: SIEMPRE crear desde `develop`, nunca desde main
- Nombradas según: `feature/description`, `bugfix/issue-number`, `refactor/description`
- Requieren PR a `develop` (no a main)
- Al crear PR, el target **SIEMPRE** es `develop`

---

## 2. Flujo de Contribución (Git Flow)

```
main (producción - SOLO para releases)
  ↑
  └─ merge desde develop (nunca directamente)
  │
develop (staging - RAMA PRINCIPAL DE TRABAJO) ←──────────────
  ↑                                                   │
  ├─ feature/new-auth (PR → develop) ←───────────────┤
  ├─ bugfix/email-validation (PR → develop) ←───────┤
  └─ refactor/database-queries (PR → develop) ←─────┘
```

### ⚠️ REGLA CRÍTICA: Todo apunta a `develop`

> **NUNCA** hacer push directo a `main` o `develop`. Todo cambio viene de una rama separada y se mergea a `develop` vía Pull Request.

### Pasos para contribuir:

1. **Sincroniza tu rama develop local** (nunca trabajar directamente en develop):

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Crea una rama de característica DESDE develop**:

   ```bash
   git checkout -b feature/nueva-caracteristica
   # Esta rama se crea desde develop, no desde main
   ```

3. Desarrolla y haz commits locales:

   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

4. **Ejecuta los checks locales antes de pushear**:

   ```bash
   npm run lint
   npm run test
   npm run build
   ```

5. **Pushea tu rama y crea un Pull Request**:

   ```bash
   git push origin feature/nueva-caracteristica
   ```

6. Al crear el PR en GitHub:
   - **Target branch: SIEMPRE `develop`** (nunca main)
   - Solicita revisión y espera feedback

7. **Después de aprobación, haz merge a `develop`** (el target es siempre develop)

---

## 3. Requisitos de Code Review

### Desarrollador (Autor)

- ✅ Asegúrate que el código compila y pasa los tests
- ✅ Documenta tu código cuando sea necesario
- ✅ Responde a los comentarios de revisión
- ✅ Actualiza el PR según feedback

### Revisor

- ✅ Revisa el código dentro de 24-48 horas
- ✅ Proporciona retroalimentación constructiva
- ✅ Aprueba o solicita cambios claramente
- ✅ No bloquees revisiones sin razón

### Criterios de revisión:

- Funcionalidad correcta
- Code quality y maintainability
- Seguridad (no expongas secrets)
- Tests adecuados
- Documentación actualizada

---

## 4. Convenciones de Commits

Usamos **Conventional Commits** para mensajes de commit claros y automatizables.

### Formato:

```
<tipo>(<alcance>): <descripción>
```

### Tipos válidos:

- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `refactor` - Refactorización sin cambio de funcionalidad
- `style` - Cambios de formato/código (linting)
- `docs` - Solo documentación
- `test` - Agregar o corregir tests
- `chore` - Mantenimiento general (deps, build, etc.)

### Ejemplos:

```bash
feat(auth): add JWT token refresh endpoint
fix(validation): handle empty email in login
docs(api): update OpenAPI documentation
refactor(db): optimize Prisma query for dogs list
```

---

## 5. Gestión de Versiones (Semantic Versioning)

Usamos **SemVer** para versionado:

- **MAJOR** (1.0.0 → 2.0.0): Cambios que rompen compatibilidad
- **MINOR** (1.0.0 → 1.1.0): Nueva funcionalidad compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes compatibles

### Release Process (siempre desde develop):

1. Asegurarse de que `develop` tenga todos los cambios ready
2. **Crear PR de `develop` → `main`** (nunca de feature directamente a main)
3. Actualizar CHANGELOG.md
4. Crear GitHub Release con tags

---

## 6. CI/CD Pipeline

### GitHub Actions (`.github/workflows/`)

#### Workflows configurados:

- **CI**: Lint, Test, Build en cada PR y push
- **(Opcional) CD**: Deploy automático a producción/staging

#### Checks obligatorios para merge:

- ✅ Linting sin errores (`npm run lint`)
- ✅ Tests pasando (`npm run test`)
- ✅ Build exitoso (`npm run build`)

---

## 7. Seguridad y Secrets

### Reglas importantes:

- **NUNCA** hacer commit de secrets, tokens, passwords en código
- Usar `.env` para configuración local (ya en `.gitignore`)
- Tokens de producción via GitHub Secrets
- Scanner de secrets configurado en CI

### Si descubres un security issue:

1. NO crees un issue público
2. Contacta al maintainer directamente
3. Describe el problema y potencial impacto

---

## 8. Roles y Responsabilidades

| Rol             | Responsabilidades                          |
| --------------- | ------------------------------------------ |
| **Owner**       | Decisiones finales, arquitectura, releases |
| **Maintainer**  | Code review, merges, gestión del repo      |
| **Contributor** | Pull requests, bugs, features              |

---

## 9. Canales de Comunicación

- **Issues**: Para reportar bugs y feature requests
- **Discussions**: Para preguntas y feedback general
- **PRs**: Para código y revisión

---

## 10. Código de Conducta

Somos un proyecto inclusivo y respetuoso. Ver [Contributor Covenant](https://www.contributor-covenant.org).

- Sé respetuoso y amable
- Acepta críticas constructivas con gracia
- Enfócate en lo que es mejor para la comunidad

---

## Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)

---

_Last updated: 2026_

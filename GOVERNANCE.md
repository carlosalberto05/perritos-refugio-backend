# 📋 Políticas de Gobernanza del Repositorio

## Propósito

Este documento establece las reglas de contribución, revisión y despliegue para mantener la calidad, seguridad e integridad del proyecto **perritos-refugio-backend**.

---

## 1. Estrategia de Ramas

### Rama `main` (Producción)

- **Propósito**: Código estable y en producción
- **Quién puede hacer merge**: Solo administradores
- **Requisitos**:
  - ✅ 2 aprobaciones de revisión obligatorias
  - ✅ Todos los checks CI/CD deben pasar
  - ✅ Branch up-to-date con `develop`
  - ✅ No se permiten pushes directos
  - ✅ Se requiere mensaje de commit convencional

### Rama `develop` (Staging/Pre-producción)

- **Propósito**: Integración de nuevas características
- **Quién puede hacer merge**: Maintainers del proyecto
- **Requisitos**:
  - ✅ 1 aprobación de revisión obligatoria
  - ✅ Todos los checks CI/CD deben pasar
  - ✅ No se permiten pushes directos
  - ✅ Se requiere mensaje de commit convencional

### Ramas de Características (feature/_, bugfix/_, etc.)

- Creadas desde `develop`
- Nombradas según: `feature/description`, `bugfix/issue-number`, `refactor/description`
- Requieren PR a `develop`

---

## 2. Flujo de Contribución (Git Flow)

```
main (producción)
  ↑
  ├─ Releases (PR con 2 aprobaciones)
  │
develop (staging)
  ↑
  ├─ feature/new-auth (PR con 1 aprobación)
  ├─ bugfix/email-validation
  └─ refactor/database-queries
```

### Pasos para contribuir:

1. Sincroniza tu rama `develop` local:

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Crea una rama de característica:

   ```bash
   git checkout -b feature/nueva-caracteristica
   ```

3. Desarrolla y haz commits locales:

   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

4. Ejecuta los checks locales antes de pushear:

   ```bash
   npm run lint
   npm run test
   npm run build
   ```

5. Pushea tu rama y crea un Pull Request:

   ```bash
   git push origin feature/nueva-caracteristica
   ```

6. Solicita revisión y espera feedback.

7. После aprobación, haz merge a `develop`.

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
- ✅ No блокируй revisiones sin razón

### Criteria de revisión:

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

### Release Process:

1. Crear PR de `develop` → `main`
2. Actualizar CHANGELOG.md
3. Crear GitHub Release con tags

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

_Última actualización: 2026_

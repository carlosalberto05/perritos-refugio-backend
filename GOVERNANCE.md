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

### Ramas de Características (feature/\*, bugfix/\*, etc.)
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
1. Crea rama desde `develop`: `git checkout -b feature/my-feature`
2. Haz commits con mensajes convencionales
3. Abre PR a `develop`
4. Espera revisión y aprobación (mínimo 1)
5. Todos los tests y linting deben pasar
6. Merge solo si todo está en verde

---

## 3. Verificaciones Obligatorias en PR

✅ **Siempre requeridas**:
- [ ] ESLint pasa sin errores
- [ ] TypeScript compila sin errores (`npm run build`)
- [ ] Todos los tests pasan (`npm run test`)
- [ ] Sin vulnerabilidades críticas (si hay scan)
- [ ] Commits con mensajes convencionales
- [ ] Descripción clara del PR

✅ **Revisión de código**:
- Mínimo 1 aprobación para `develop`
- Mínimo 2 aprobaciones para `main`
- Reviewer diferente del autor

---

## 4. Estándares de Commits

Usar **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos válidos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `refactor`: Cambios sin funcionalidad nueva
- `test`: Agregación o corrección de tests
- `chore`: Cambios en dependencias, configuración
- `ci`: Cambios en CI/CD

### Ejemplos:
```
feat(auth): add JWT token refresh mechanism
fix(dogs): prevent null pointer on missing image
docs(README): update setup instructions
```

---

## 5. Reglas de Protección de Rama

### Configuración automática requerida:

**Para `main`:**
```
✅ Require a pull request before merging
   └─ Require approvals: 2
   └─ Require review from Code Owners: YES
✅ Require status checks to pass before merging
   └─ Require branches to be up to date before merging
✅ Require conversation resolution before merging
✅ Require commits to be signed
✅ Dismiss stale pull request approvals when new commits are pushed
✅ Require status checks to pass before merging (GitHub Actions)
   └─ build-and-test
   └─ security-scan (si aplica)
```

**Para `develop`:**
```
✅ Require a pull request before merging
   └─ Require approvals: 1
   └─ Require review from Code Owners: YES
✅ Require status checks to pass before merging
   └─ Require branches to be up to date before merging
✅ Require conversation resolution before merging
✅ Dismiss stale pull request approvals when new commits are pushed
✅ Require status checks to pass before merging (GitHub Actions)
   └─ build-and-test
```

---

## 6. Despliegue a Producción

### Proceso:
1. PR desde `develop` → `main`
2. ✅ 2 aprobaciones obligatorias
3. ✅ Todos los checks CI/CD pasan
4. ✅ CODEOWNERS revisan
5. Merge a `main` (Squash merge recomendado)
6. Workflow de despliegue se activa automáticamente

### Restricciones:
- ❌ NO se despliega automáticamente en `push` a `develop`
- ❌ Solo PRs aprobadas generan deploys
- ✅ Se requiere aprobación explícita

---

## 7. CODEOWNERS (Control de Acceso)

Crear archivo `.github/CODEOWNERS`:

```
# Propietarios predeterminados de todo el repositorio
* @carlosalberto05

# Autenticación
/src/auth @carlosalberto05

# Base de datos
/prisma @carlosalberto05
/src/database @carlosalberto05

# Documentación
/docs @carlosalberto05
/*.md @carlosalberto05
```

---

## 8. Seguridad: Dependencias y Vulnerabilidades

### Requerimientos:
- Dependabot o Renovate habilitado
- Actualizaciones de seguridad automáticas en rama de security
- Scans de seguridad en PR (si usas Snyk, CodeQL, etc.)

---

## 9. Releases

### Versionado: Semantic Versioning (MAJOR.MINOR.PATCH)
- `v1.0.0` - Major: cambios incompatibles
- `v1.1.0` - Minor: nuevas características
- `v1.0.1` - Patch: correcciones

### Proceso de Release:
1. Crear rama `release/v1.1.0` desde `develop`
2. Actualizar `package.json` versión
3. Actualizar `CHANGELOG.md`
4. PR a `main` con 2 aprobaciones
5. Merge a `main` y crear tag: `git tag v1.1.0`
6. Merge back a `develop`

---

## 10. Respuesta ante Violaciones

### Nivel 1 (Advertencia):
- Commit directo a `develop` o `main`
- Merge sin aprobación

### Nivel 2 (Restricción temporal):
- Múltiples violaciones
- Desactivación de permisos por 7 días

### Nivel 3 (Remoción):
- Comportamiento repetido o malintencionado
- Violación de seguridad grave

---

## 11. Checklist para Nuevas Contribuciones

Antes de hacer push, verifica:

```bash
# 1. Tests pasan
npm run test

# 2. Linting
npm run lint

# 3. Build sin errores
npm run build

# 4. Commits con mensaje convencional
git log --oneline -5

# 5. Rama actualizada
git pull origin develop

# 6. Mensaje de PR claro y descriptivo
```

---

## Contacto y Preguntas

Para preguntas sobre este documento, abre un issue o contacta a @carlosalberto05

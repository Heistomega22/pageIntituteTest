# Sistema web del instituto15

Sistema web desarrollado para la gestión de alumnos, profesores y cursos del instituto IFTS15.

## Lenguajes utilizados
- HTML
- CSS
- JavaScript
- PHP
- SQL

## Tecnologías utilizadas
- Node.js
- Express.js
- **Firebase Realtime Database** (no MySQL)

## Objetivo del proyecto
- Gestionar alumnos, profesores y cursos del instituto15.
- Espacio por curso para que los profesores suban materiales y tareas; los alumnos pueden subir sus trabajos.
- Los profesores pueden descargar, editar, comentar y calificar los trabajos subidos por los alumnos.
- Los alumnos pueden ver sus cursos, materiales y tareas, y subir sus trabajos.
- Los administradores gestionan usuarios, cursos y reportes.
- Los alumnos pueden ver sus notas y reportes de sus cursos.
- Los profesores pueden ver reportes de sus cursos y alumnos.

## Sistema de base de datos y gestión de usuarios

- Se utiliza un sistema de IDs único y un campo `grupo_id` para cada usuario, que referencia la tabla de grupos:
  - Desarrolladores/mantenedores: ID 1
  - Alumnos: ID 2
  - Profesores: ID 3
- Ejemplo de creación de usuario: `createNewUser($username, $password, $grupo_id)`
- [createNewUser](/apps/frontend/src/services/userService.js)

## Avances y funcionalidades actuales

### Funcionalidades principales
1. **Gestión de usuarios**:
   - Creación de usuarios con roles (alumnos, profesores, testers).
   - Validación de datos de usuario.
   - Almacenamiento en Firebase Realtime Database.
   - Archivos relacionados:
     - [userService](/apps/frontend/src/services/userService.js)
     - [users](/apps/frontend/src/models/users.js)
     - [dbcfb](/database/connection/dbcfb.js)

2. **Inicio de sesión**:
   - Validación de credenciales de usuario.
   - Redirección a la página principal en caso de éxito.
   - Archivos relacionados:
     - [loginController](/apps/frontend/src/controllers/loginController.js)
     - [login.html](/apps/frontend/public/security/login/login.html)

3. **Carga de usuarios de prueba**:
   - Script para agregar usuarios de prueba (alumnos y profesores) a la base de datos.
   - Archivos relacionados:
     - [register.js](/apps/frontend/public/security/register.js)  
     - [register.html](/apps/frontend/public/security/register.html)

4. **Conexión con Firebase**:
   - Configuración de Firebase Realtime Database.
   - Prueba de conexión con la base de datos.
   - Archivos relacionados:
     - [dbcfb](/database/connection/dbcfb.js)

5. **Estructura de datos**:
   - JSON de ejemplo para la estructura de usuarios en la base de datos.
   - Archivos relacionados:
     - [maqquetado.json](/database/maqquetado.json)

6. **Página principal**:
   - Carrusel de imágenes.
   - Navegación dinámica según el estado del usuario (login/logout).
   - Archivos relacionados:
     - [index.html](/apps/frontend/public/home/main/index.html)

### Cambios recientes
- **Validación de grupo en `UserService`**:
  - Se añadió validación para `grupoId` en los métodos `createUser` y `getUser`.
- **Soporte para nombres y apellidos compuestos**:
  - Métodos `getSegundoNombre` y `getSegundoApellido` en el modelo `User`.
- **Pruebas de conexión a Firebase**:
  - Método `testDatabaseConnection` para verificar la conexión.
- **Script de prueba para agregar usuarios**:
  - Script en `register.js` para agregar usuarios de prueba y verificar su recuperación.
- **Creacion de un script para eliminar sessiones exedentes de la base de datos**.
   - Script en [delInactiveSessions.js](/apps/frontend/src/services/delInactiveSessions.js)


---

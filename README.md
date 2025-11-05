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

### Próximos pasos
- Crear la base principal de cursos y su gestión:
  - Estructura:
    - materiales (pdfs, videos, imágenes, archivos)
    - tareas (con fecha de entrega, descripción, archivos adjuntos)
    - foro de discusión (maqueta simple)
    - apartado de alumnos asignados a ese curso
- La base de datos es Firebase Realtime Database, estructura en JSON anidado, fácil de manejar y rápida. [X]
- Se pueden crear índices para acelerar búsquedas si es necesario. [X]

---

## Información institucional

**Dirección:** Loyola 1500, 1414, Villa Crespo  
**Teléfono:** 011 3898-1600  
**Correo electrónico:** infoifts15@gmail.com

**Carrera:** Tecnicatura Superior en Realización Audiovisual  
**Modalidad:** Presencial/Híbrida  
**Duración:** 2 años y medio (2104 horas cátedra)  
**Requisitos:** Secundario completo

**Perfil del egresado:**  
Podrás planificar la producción y ejecutar la realización de un producto audiovisual, desarrollando la producción en sus aspectos artísticos y técnicos, participando en la postproducción y evaluando variables socioeconómicas que influyen en la realización.

**Contenidos:**  
- Historia social argentina contemporánea
- Lenguajes y técnicas artísticas contemporáneas
- Producción de proyectos audiovisuales
- Principios de la comunicación social y análisis de los medios
- Inglés técnico
- Técnicas de realización audiovisual
- Narrativas audiovisuales tradicionales y nuevas
- Historia del arte audiovisual argentino
- Culturas y subjetividades
- Práctica profesionalizante: Realización de cortometraje

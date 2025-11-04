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

## Informacion para poner
Categorías

Sitio web de educación
Información de contacto

Loyola 1500, 1414
Dirección

011 3898-1600
Móvil

infoifts15@gmail.com
Correo electrónico

Carrera ᴅᴇ ᴘʀᴏᴅᴜᴄᴄɪᴏɴ ʏ ʀᴇᴀʟɪᴢᴀᴄɪᴏɴ ᴀᴜᴅɪᴏᴠɪꜱᴜᴀʟ 🎥
ᴛɪᴛᴜʟᴏ ᴏꜰɪᴄɪᴀʟ 

Tecnicatura Superior en Realización Audiovisual
Compartir en redes
Podrás planificar la producción y ejecutar la realización de un producto audiovisual. Desarrollar la producción de una pieza audiovisual en sus aspectos artísticos y técnicos, tanto en inicio como durante el registro del material audiovisual; de participar y planificar los procesos de postproducción. Asimismo, podrás evaluar las posibilidades y variables socioeconómicas que influyen en la realización del producto audiovisual.

Requisitos:
Secundario completo.

Categoría
Industrias Gráfica, Publicitaria y Multimedial
Barrio
Villa Crespo
Características de la propuesta

Modalidad
Presencial/Híbrida


calendar_month
Duración
2 años y medio


class
Turno
Noche


museum
Sedes
IFTS °15

Tecnicatura Superior en Realización Audiovisual
● Área de formación: Comunicación y Producción Audiovisual
● Título que otorga: Tecnicatura Superior en Realización Audiovisual
● Duración: 2 años y medio/ 5 cuatrimestres
● Cantidad de horas: 2104 horas cátedra
● Requisitos: Secundario completo
● Perfil del/a egresado/a: Podrás planificar la producción y ejecutar la realización de
un producto audiovisual. Desarrollar la producción de una pieza audiovisual en sus
aspectos artísticos y técnicos, tanto en inicio como durante el registro del material
audiovisual; de participar y planificar los procesos de postproducción. Asimismo,
podrás evaluar las posibilidades y variables socioeconómicas que influyen en la
realización del producto audiovisual.
● Contenidos:
1° año
Cuatrimestre  | Código |         Instancias curriculares               | Cant. hs cát. | Tipo de Espacio Curricular  | Campo Formativo | Carga horaria cuatrimestral |
PRIMER AÑO:

                                                                       |               |                             |                 |
             | 1,1,1  | Historia social argentina contemporánea        |        48     |          Materia            | General         |
Primer       | 1,1,2  | Lenguajes y técnicas artísticas contemporáneas |        96     |          Materia            | Fundamento      |
Cuatrimestre | 1,1,3  | Producción de proyectos audiovisuales          |        96     |          Taller             | Específica      |    400 hs 
             | 1,1,4  | Principios de la comunicación social y análisis|               |                             |                 |
                        de los medios                                  |        96     |          Materia            | Fundamento      |
             | 1,1,5  | Inglés técnico                                 |        64     |          Materia            | Fundamento      |
==========================================================================================================================================================Segundo
cuatrimestre  | 1,2,1  | Técnicas de realización audiovisual           |        64     |          Taller             | Específica      |
              | 1,2,2  | Narrativas audiovisuales tradicionales de     |               |                             |                 |
                         ficción                                       |        64     |          Taller             | Específica      | 416 hs
              | 1,2,3  | Nuevas narrativas audiovisuales de no ficción |        64     |          Taller             | Específica      |
              | 1.2.4  | Historia del arte audiovisual argentino       |        48     |          Materia            | Fundamento      |
              | 1.2.5  | Culturas y subjetividades                     |        48     |          Materia            | General         |
              | 1.2.6  | Práctica profesionalizante I:                 |               |                             |                 |
              |        | Realización de cortometraje                   |       128     |          Práctica           | Práctica        |






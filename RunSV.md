# Instrucciones para levantar de forma local y compartir el entorno de desarrollo con un link

## Requisitos previos para funcionamiento correcto
- Tener instalado Node.js y npm.
- Tener una cuenta de Firebase y un proyecto configurado con Realtime Database. **(se puede cambiar por MySQL si se desea, adaptando el codigo manteniendo la estructura)**


## Pasos para levantar el proyecto localmente
1. Clonar el repositorio
2. Entrar en la carpeta del proyecto
3. Instalar las dependencias con `npm install` o `npm ci`
4. La base de datos utilizada es Firebase Realtime Database. Configurar el archivo de conexión a Firebase en `database/connection/dbcfb.js` con las credenciales de tu proyecto de Firebase. **Pueden usar el que viene por defecto y modificarlo según sus necesidades**
5. Iniciar el servidor con `npm start` o `node server.js`
6. Acceder a la aplicación en el navegador web `Se mostrara en la terminal el puerto en el que se esta ejecutando, por defecto es el 1337.` 

## Compartir el entorno de desarrollo con un link
1. Instalar ngrok desde https://ngrok.com/
2. Iniciar ngrok con el comando `ngrok http 1337` (o el puerto que se esté utilizando) en [server.js](/apps/frontend/src/services/server.js)
3. Copiar el link generado por ngrok y compartirlo con quien desees.

- detalles:
    - ngrok necesita una cuenta, y pasarle un token único una sola vez.
  

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port =  1337;

app.use(express.static(path.join(__dirname, '../../../frontend/public')));
app.use('/apps/frontend/public', express.static(path.join(__dirname, '../../../frontend/public')));
app.use('/apps/frontend/src', express.static(path.join(__dirname, '../../../frontend/src')));
app.use('/database', express.static(path.join(__dirname, '../../../../database')));
app.use('/docs', express.static(path.join(__dirname, '../../../../docs')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/public/home/main/index.html'));
});

app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Página no encontrada</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px;
                    background-color: #f4f4f4;
                }
                h1 { color: #d9534f; }
            </style>
        </head>
        <body>
            <h1>Error 404 - Página no encontrada</h1>
            <p>La página que buscas no existe.</p>
            <a href="/">Volver al inicio</a>
        </body>
        </html>
    `);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error del servidor</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px;
                    background-color: #f4f4f4;
                }
                h1 { color: #d9534f; }
            </style>
        </head>
        <body>
            <h1>Error 500 - Error del servidor</h1>
            <p>Ha ocurrido un error interno del servidor.</p>
            <a href="/">Volver al inicio</a>
        </body>
        </html>
    `);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}/apps/frontend/public/home/main/index.html`);
    console.log(`Directorio actual: ${__dirname}`);
    console.log(`Ruta pública: ${path.join(__dirname, 'apps/frontend/public')}`);
});


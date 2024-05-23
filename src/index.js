/* Modulos de ES6 */
import express from 'express';
import ejs from 'ejs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
// console.log(join(__dirname, 'views'));
// C:\Users\Computer\Documents\Code\proyecto-sena\src\views

app.set('view engine', 'ejs');

app.use(indexRoutes);

app.listen(3000, () => {
    console.log('Server on port 3000');
});

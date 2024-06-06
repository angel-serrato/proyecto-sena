/* Modulos de ES6 */
import express from 'express';
import ejs from 'ejs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// C:\Users\Computer\Documents\Code\proyecto-sena\src\views
app.set('views', join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(indexRoutes);

app.use(express.static(join(__dirname, 'public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server on port: http://localhost:${port}`)
});

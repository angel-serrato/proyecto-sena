import { Router } from 'express';
import collection from '../public/js/mongo.js';
import login from '../public/js/login.js';
const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'La Pizza de el Canas' })
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Me' })
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar sesión' })
});

router.get('/terminos', (req, res) => {
    res.render('terminos', { title: 'Terminos y condiciones' })
});

router.get('/politica', (req, res) => {
    res.render('politica', { title: 'Política de privacidad' })
});

router.get('/datos', (req, res) => {
    res.render('datos', { title: 'Política de tratamiento de datos' })
});

router.use(login);

router.get('/admin', (req, res) => {
    if (req.session.user) {
        res.render('admin', { title: 'Panel de administración' });
    } else {
        res.redirect('/login');
    }
});

export default router;

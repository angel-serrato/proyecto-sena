import { Router } from 'express';
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

export default router;

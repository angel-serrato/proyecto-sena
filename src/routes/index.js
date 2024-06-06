import { Router } from 'express';
import collection from '../public/js/mongo.js';
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

router.post('/login', async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            res.send('Usuario no encontrado');
        }
        if (user.password !== req.body.password) {
            res.send('Nombre de usuario o contraseña incorrectos')
        }
        res.redirect('../admin');
    } catch (error) {
        console.log('Error en la autenticación', error)
        res.status(500).send('Nombre de usuario o contraseña incorrectos')
    }
});

router.get('/admin', (req, res) => {
    // if (req.isAuthenticated()) {
    //     res.render('admin', { title: 'Admin' });
    // } else {
    //     res.redirect('/login');
    // }
    res.render('admin', { title: 'Admin' });
});

export default router;

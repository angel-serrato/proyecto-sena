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

// Esta ruta para el inicio de sesion 
// router.post('/login', async (req, res) => {
//     try {
//         const user = await collection.findOne({ email: req.body.email });
//         if (!user) {
//             res.send('Usuario no encontrado');
//         }
//         if (user.password !== req.body.password) {
//             return res.redirect('./login');
//             // res.send('Nombre de usuario o contraseña incorrectos')
//         }
//         req.session.user = user;
//         res.redirect('/admin');
//     } catch (error) {
//         console.log('Error en la autenticación', error)
//         res.status(500).send('Nombre de usuario o contraseña incorrectos')
//     }
// });

router.post('/login', async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (user.password !== req.body.password) {
            return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
        req.session.user = user;
        res.redirect('/admin');
    } catch (error) {
        console.log('Error en la autenticación', error);
        res.status(500).json('Nombre de usuario o contraseña incorrectos');
    }
});

// Ruta para cerrar la sesión
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión', err)
            res.status(500).send('Error al cerrar la sesión')
        }
        console.log('Sesión cerrada');
        res.redirect('/login');
    });
});

router.get('/admin', (req, res) => {
    if (req.session.user) {
        res.render('admin', { title: 'Panel de administración' });
    } else {
        res.redirect('/login');
    }
});

export default router;

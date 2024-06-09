import { Router } from 'express';
import collection from './mongo.js';

const login = Router();

login.post('/login', async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            return res.redirect('./login');
            // res.send('Usuario no encontrado');
        }
        if (user.password !== req.body.password) {
            return res.redirect('./login');
            // res.send('Nombre de usuario o contraseña incorrectos')
        }
        req.session.user = user;
        res.redirect('/admin');
    } catch (error) {
        console.log('Error en la autenticación', error)
        res.status(500).send('Nombre de usuario o contraseña incorrectos')
    }
});

login.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión', err)
            res.status(500).send('Error al cerrar la sesión')
        }
        console.log('Sesión cerrada');
        res.redirect('/login');
    });
});

export default login;
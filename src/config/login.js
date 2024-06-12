import { Router } from 'express'
// import User from '../models/user.js'

const router = Router()

// router.post('/register', async (req, res) => {
//     try {
//         const usuario = new User({
//             email: req.body.email,
//             password: req.body.password
//         })
//         await usuario.save()
//         res.redirect('../admin')
//     } catch (error) {
//         res.status(500).send('Error al registrar el usuario')
//     }
// })

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

export default router
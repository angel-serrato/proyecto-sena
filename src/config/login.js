import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const usuario = new User({
            email: req.body.email,
            password: req.body.password
        })
        await usuario.save()
        // res.send('Usuario creado correctamente')
        res.redirect('../admin')
    } catch (error) {
        res.status(500).send('Error al registrar el usuario')
    }
})

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

// router.get('/find', async (req, res) => {
//     try {
//         const { email } = req.query
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(404).send('Usuario no encontrado')
//         }
//         res.send(user.password)
//     } catch (error) {
//         res.status(500).send('Error al buscar la contraseña del usuario')
//     }
// })

// router.get('/edit/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const usuario = await User.findById(id)
//         if (usuario == null) {
//             res.render('/buscar')
//         } else {
//             res.render('edit_user', {
//                 title: 'Edit user',
//                 usuario: usuario
//             })
//         }
//     } catch (error) {
//         console.error(error)
//         res.render('/buscar')
//     }
// })

export default router
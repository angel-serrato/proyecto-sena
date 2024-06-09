const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

router.get('/', (req, res) => {
    res.render('index', { title: 'App' })
})

router.get('/edit', (req, res) => {
    res.render('edit', { title: 'Edit' })
})

router.get('/buscar', (req, res) => {
    res.render('buscar', { title: 'Buscador' })
})

router.post('/register', async (req, res) => {
    try {
        const usuario = new User({
            email: req.body.email,
            password: req.body.password
        })
        await usuario.save()
        // res.send('Usuario creado correctamente')
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Error al registrar el usuario')
    }
})

router.get('/find', async (req, res) => {
    try {
        const { email } = req.query
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send('Usuario no encontrado')
        }
        res.send(user.password)
    } catch (error) {
        res.status(500).send('Error al buscar la contraseña del usuario')
    }
})

router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const usuario = await User.findById(id)
        if (usuario == null) {
            res.render('/buscar')
        } else {
            res.render('edit_user', {
                title: 'Edit user',
                usuario: usuario
            })
        }
    } catch (error) {
        console.error(error)
        res.render('/buscar')
    }
})

// router.get("/edit/:id", async (req, res) => {
//     try {
//       const id = req.params.id;
//       const product = await Product.findById(id);

//       if (product == null) {
//         res.render("/productos");
//       } else {
//         res.render("edit_products", {
//           title: "Editar Producto",
//           product: product,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       res.render("/productos");
//     }
//   });

module.exports = router
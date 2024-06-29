import { Router } from 'express'
const router = Router()
import { createProduct } from '../controllers/productController.js'

router.get('/', (req, res) => {
    res.render('index', { title: 'La pizza de el canas' })
})

router.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión', errorMsg: req.session.errorMsg })
})

router.get('/datos', (req, res) => {
    res.render('datos', { title: 'Política de Tratamiento de Datos' })
})

router.get('/terminos', (req, res) => {
    res.render('terminos', { title: 'Términos y Condiciones' })
})

router.get('/politica', (req, res) => {
    res.render('politica', { title: 'Política de Privacidad' })
})

router.get('/admin', (req, res) => {
    if (req.session.user) {
        res.render('admin', { title: 'Administrador' })
    } else {
        res.redirect('/login')
    }
})



export default router
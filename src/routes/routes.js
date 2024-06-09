import { Router } from 'express'
import login from '../config/login.js'
const router = Router()

router.get('/', (req, res) => {
    res.render('index', { title: 'La pizza de el canas' })
})

// router.get('/edit', (req, res) => {
//     res.render('edit', { title: 'Edit' })
// })

// router.get('/buscar', (req, res) => {
//     res.render('buscar', { title: 'Buscador' })
// })

router.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' })
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

export default router
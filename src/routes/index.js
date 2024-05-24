import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'La Pizza de el Canas' })
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Me' })
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Me' })
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Log In' })
});

export default router;

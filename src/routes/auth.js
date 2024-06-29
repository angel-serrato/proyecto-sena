import express from 'express';
const router = express.Router();
import User from '../models/user.js';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !user.validPassword(password)) {
        req.session.errorMsg = 'Usuario y/o contraseña incorrectos';
        res.redirect('/login');
    } else {
        req.session.user = user;
        res.redirect('/admin');
    }
});

export default router;

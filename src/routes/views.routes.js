import { Router } from 'express';

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/products');
    next();
}


router.get('/register', publicAccess, (req, res) => {
    res.render('register');
})

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
})



export default router;
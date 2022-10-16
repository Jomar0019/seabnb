const { Router } = require('express');

const { getSignUp, postSignUp, getLogin, postLogin, logout } = require('../controller/authController')

const router = Router();

router.get('/signup', getSignUp)

router.post('/signup', postSignUp)

router.get('/login', getLogin)

router.post('/login', postLogin)

router.get('/logout', logout)

module.exports = router;
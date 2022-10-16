const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''}

    // incorrect email
    if(err.message === 'Incorrect Email') {
        errors.email = 'Email is not registered'
    }

    // incorrect password
    if(err.message === 'Incorrect Password') {
        errors.password = 'Incorrect Password'
    }

    // duplicate email error
    if(err.code === 11000) {
        errors.email = "Email already used."
        return errors;
    }

    // VALIDATION ERRORS 
    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'jomar0019secret', {
        expiresIn: '3d'
    })
}

const getSignUp = (req,res) => {
    res.render('signup');
}

const postSignUp = async (req,res) => {
    const { email, fullname, password } = req.body;

    try{
        const user = await User.create({ email, fullname, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

const getLogin = (req,res) => {
    res.render('login')
}

const postLogin = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

const logout = (req,res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/')
}

module.exports = { getSignUp, postSignUp, getLogin, postLogin, logout }
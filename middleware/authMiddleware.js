const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const requireAuth = (req,res, next) => {
    const token = req.cookies.jwt;

    // check jwt exist
    if(token) {
        jwt.verify(token, 'jomar0019secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'jomar0019secret', async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
} 

module.exports = { requireAuth, checkUser }
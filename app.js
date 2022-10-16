require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const authRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// db connection
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Connected to db and listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    });

// ROUTES

app.get('*', checkUser );

// User Routes
app.use(authRoutes);

// Post Routes
app.use(postRoutes)



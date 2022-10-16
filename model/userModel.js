const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [ true, 'Please enter an email' ],
        unique: true,
        lowercase: true,
        validate: [ isEmail , 'Please enter a valid email']
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [ true, 'Please enter an password' ],
        minlength: [8, 'Minimun password length is 8 characters']
    }
});

// FIRE A FUNCTION BEFORE DOC SAVED TO DB 
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// STATIC METHOD LOGIN
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}

module.exports = mongoose.model("User", userSchema);
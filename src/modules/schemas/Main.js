const mongoose = require('mongoose');
const { isEmail, isStrongPassword, isBase64 } = require('validator').default;

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        unique: [true, 'Email already in use'],
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        validate: [isStrongPassword, 'Please provide a strong password']
    },
    createdAt: Date
})

module.exports = mongoose.model('users', User) 
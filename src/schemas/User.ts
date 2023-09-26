import mongoose, { Schema } from "mongoose";
import validator from 'validator'

const User: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        unique: [true, 'Username already in use'],
        validate: [validator.isLowercase, 'Username must be in lowercase']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: [true, 'Email already in use'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    instagram_id: {
        type: String,
        required: [true, 'Please enter your instagram id']
    },
    created_at: Date
})

export default mongoose.model('users', User)
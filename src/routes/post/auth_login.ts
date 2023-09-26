import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../../schemas/User'
import { handle_error } from '../../modules/emps'

module.exports = async (req: Request, res: Response) => {

    // destructure email and password from request body
    const { email, password } = req.body;

    try {
        // find user by email
        const user = await User.findOne({ email });

        // check if user exists
        if (user === null) return handle_error(null, res, `no user found with email ${email}`);

        // compare password with hashed password in database
        const auth = await bcrypt.compare(password, user.password);

        // generate JWT token
        const token = jwt.sign({ id: user._id }, `${process.env.API_KEY}`, { expiresIn: '14d' });

        // check if password is correct
        if (auth) return res.status(200).json({
            status: 'success',
            message: `logged in as ${ user.username }`,
            data: {
                token
            }
        });
        else handle_error(null, res, `incorrect password`);
    } catch (err) {
        handle_error(err, res, null);
    }
    
}
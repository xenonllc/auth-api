import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import User from '../../schemas/User'
import { handle_error } from '../../modules/emps'

module.exports = async (req: Request, res: Response) => {

    const { body } = req

    try {
        // Get start time
        const starttime = new Date().getMilliseconds()

        const salt = await bcrypt.genSalt(10) // Gen salt
        const hashed_pwrd = await bcrypt.hash(body.password, salt) // Hash password

        // Create new user with recieved data
        const user = await User.create({
            username: body.username,
            email: body.email,
            password: hashed_pwrd,
            instagram_id: body.instagram_id,
            created_at: new Date().toISOString()
        })

        // Get end time
        const endtime = new Date().getMilliseconds();

        // Send success message
        res.status(200).json({
            status: 'success',
            message: `sent in ${endtime-starttime}ms`,
            data: user
        })

    } catch (err) {

        // Error handling
        handle_error(err, res, null)
    }

}
import { Request, Response } from 'express'

import User from '../../schemas/User'
import { handle_error } from '../../modules/emps'

module.exports = async (req: Request, res: Response) => {
    try {
        // Find user in db
        const user = await User.findOne({ _id: req.params.id })

        // Send success message with data
        res.status(200).json({
            status: 'success',
            message: 'retrieved data',
            data: user
        })
    } catch (err) {

        // Error handling
        handle_error(err, res, `user with id - ${req.params.id} not found`)
    }
}
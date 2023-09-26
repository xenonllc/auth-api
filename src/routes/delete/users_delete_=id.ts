import { Request, Response } from 'express'
import User from '../../schemas/User'
import { handle_error } from '../../modules/emps'

module.exports = async (req: Request, res: Response) => {
    // find and delete user by id
    const user = await User.findOne({ _id: req.params.id })

    // send error message
    if (!user) return handle_error(null, res, `couldn't find user with id ${req.params.id}`)

    await user?.deleteOne()

    // send success message
    res.status(200).json({
        status: 'success',
        message: `deleted user with id ${ req.params.id }`
    })
}
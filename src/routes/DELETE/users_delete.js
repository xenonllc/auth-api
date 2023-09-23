const { handleError } = require('../../modules');
const User = require('../../modules/schemas/Main')

module.exports = async (req, res) => {

    const users = await User.findByIdAndDelete(req.query.id);
    
    if (users === null) return handleError('', res, `Coudn't find user with id - ${req.query.id}`)
    
    res.status(200).json({
        status: 'success',
        message: `Deleted user with id - ${req.query.id}`,
        data: users
    })

}
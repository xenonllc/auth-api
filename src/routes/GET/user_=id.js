const { handleError } = require('../../modules');
const User = require('../../modules/schemas/Main')

module.exports = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
    
        res.status(200).json({
            status: 'success',
            message: `Found user`,
            data: users
        })
    } catch (err) {
        handleError(err, res, `No users found`)
    }
}
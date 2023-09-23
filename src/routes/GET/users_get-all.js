const User = require('../../modules/schemas/Main')

module.exports = async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        status: 'success',
        message: `Found ${users.length} ${users.length === 1 ? 'user' : 'users'}`,
        data: users
    })
}
const User = require('../../modules/schemas/Main');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { handleError } = require('../../modules');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (user === null) return handleError('', res, 'No User Found')
        
        const auth = await bcrypt.compare(password, user.password)

        const token = jwt.sign({ _id: user.id, staff: false }, process.env.API_KEY, {
            expiresIn: '14d'
        });

        if (auth) return res.status(200).json({
            status: 'success',
            message: `Welcome back, ${user.name}!`,
            data: {
                token
            }
        })
        else handleError('', res, 'Incorrect Password')

    } catch (err) {
        handleError(err, res)
    }
}
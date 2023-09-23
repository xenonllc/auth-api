const User = require("../../modules/schemas/Main")
const bcrypt = require('bcrypt')
const { handleError } = require('../../modules')

module.exports = async (req, res) => {
    try {
        const starttime = new Date().getMilliseconds()

        const salt = await bcrypt.genSalt(10);
        const hashed_pwrd = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashed_pwrd,
            createdAt: new Date().toISOString(),  
        })
        
        const endtime = new Date().getMilliseconds();

        res.status(200).json({
            status: 'success',
            message: `Successfully sent in ${endtime-starttime}ms`,
            data: user
        })
    } catch (err) {
        handleError(err, res)
    }
}
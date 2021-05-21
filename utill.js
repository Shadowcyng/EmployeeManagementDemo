const jwt = require('jsonwebtoken')
const config = require('./config')

const getToken = ( user)    => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
    }, config.JWT_SECRET, {
        expiresIn: '24h'
    })
}
module.exports = {getToken}
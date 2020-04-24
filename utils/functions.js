const jsonWebToken = require('jsonwebtoken')

module.exports.getUserId = (authToken) => {
    return jsonWebToken.decode(authToken.slice(7)).userId
}

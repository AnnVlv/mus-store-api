const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const KEYS = require('../config/keys')
const User = require('../models/user')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: KEYS.jsonWebToken
};

module.exports = passport => {
  passport.use(
      new JwtStrategy(options, async (payload, done) => {
          try {
              const user = await User.findByPk(payload.userId)
              
              if (user) {
                  done(null, user)
              } else {
                  done(null, false)
              }
          } catch {
              console.log('Got error when was trying to read token.')
          }
      })
  )
}

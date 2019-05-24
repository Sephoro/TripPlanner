require('dotenv').config({ path: '../.env' })
const GoogleStrategy = require('passport-google-oauth')
  .OAuth2Strategy

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/account/google/redirect'
  }, (token, refreshToken, profile, done) => {
    let user = profile
    return done(null, user)
  })
  )
}

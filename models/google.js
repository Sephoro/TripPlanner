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
    clientID: '206542986789-u442a5ka4qkpghi7gmielr11g40bv3dh.apps.googleusercontent.com',
    clientSecret: 'QAYOdGGuKGE7L6mF8zQ0BIWr',
    callbackURL: 'http://localhost:3000/Home'
  }, (token, refreshToken, profile, done) => {
    return done(null, {
      profile: profile,
      token: token
    })
  }))
}

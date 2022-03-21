const passport = require('passport')
const passportlocal = require('passport-local').Strategy
const { JWT_SECRECT } = require('../config/index')
const User = require('../model/userModel')

passport.use(new passportlocal({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const login = await User.findOne({ email })

        if (!login) return done(null, false)
        const CorrectPass = await login.isValidPassword(password)

        if (!CorrectPass) return done(null, false)

        done(null, login)

    } catch (error) {
        done(error, false)

    }




}))
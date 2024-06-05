import config from '../config/config.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'


export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) {
                return res.status(401).send({ status: 'error', message: err.message })
            }
            req.user = user

            next()
        })(req, res, next)
    }
}

export const authRole = (role) => (req, res, next) => {
    
    if(!req.user) {
        return res.status(401).send({ status: 'error', message: 'User not logged in' })
    }

    const userRole = req.user.role

    if (userRole.toUpperCase() !== role) {
        return res.status(403).send({ status: 'error', message: 'User Unauthorized - Role check FAILED.' })
    }

    next();
}

// Config JWT
export const generateToken = (user) => {

    const token = jwt.sign({ user }, config.JWT_PASS, {
        expiresIn: '12h'
    })
    // console.log(`GENERATED TOKEN`, {token});
    return token
}

export const authToken = (req, res, next) => {
    const userToken = req.headers['authorization']
    if(!userToken) {
        return res.status(401).send({ status: 'error', error: "Unauthorized - No Credentials Provided." });
    }

    const token = userToken.split(" ")[1]

    jwt.verify(token, config.JWT_PASS, (err, credentials) => {
        if(err) {
            err = {
                name: err.name,
                message: err.message
            }
            return res.status(403).send({ 
                status: 'error',
                message: 'Unauthorized - Invalid JWT credentials',
                error: err
            })
        }

        req.user = credentials.user
        next();
    })
}

export const generateResetPasswordToken = (user) => {
    const tokenInfo = {
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    }

    const token = jwt.sign(tokenInfo, config.JWT_PASS)

    return token;
}

export const getLoggedInUser = (token) => {

}
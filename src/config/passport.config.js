// Envs imports
import config from './config.js';
// Passport imports
import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import jwt from 'passport-jwt';
import { UserService } from '../repository/index.js';
import { createHash, validatePassword } from '../utils/utils.js';
import UserModel from '../dao/mongo/models/users.model.js';


const LocalStrategy = local.Strategy

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    // Local
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    async(req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await UserService.findByEmail(username)
            if (user) {
                console.log(`Already exists a user with email ${username}`);
                return done(null, user)
            }

            const newUser = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                social: 'local',
                rol: 'user',
                password: createHash(password),
            }

            const result = await UserService.create(newUser)
            await result.save()
            
            return done(null, result)

        } catch (error) {
            return done(`There's been an error trying to register: ${error.message}`)
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    },
    async (username, password, done) => {
        try {
            const user = await UserService.findByEmail(username)
            if(!user) {
                return done(null, false)
            }

            if(!validatePassword(user, password)) {
                return done(null, false)
            }
            
            return done(null, user)

        } catch (error) {
            return done(`There's been an error trying to login: ${error.message}`)
        }
    }))

    // JWT Strategy
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWT_PASS
    },
    async (jwt_payload, done) =>{
        try {
            const user = jwt_payload
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    // GitHubStrategy
    passport.use('github', new GitHubStrategy({
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            console.log({profile});
            const user = await UserService.find(profile._json.email)
            if(user) {
                return done(null, user)
            }

            const newUserFromGitHub = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: profile._json.email,
                social: 'GitHub',
            }

            const result = await UserService.create(newUserFromGitHub)
            await result.save();

            return done(null, result)

        } catch (error) {
            return done(`There's been an error trying to access with GitHub Account: ${error.message}`)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findOne({ _id: id })
        done(null, user)
    });
}


export default initializePassport
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import local from 'passport-local';
import userService from '../dao/models/Users.model.js';
import { createHash, validatePassword } from '../utils/utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    // Configuración de GitHubStrategy
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.96964e29d6c93f50',
        clientSecret: '7dc1b4bf1daf410f4d84a0b0adc8f77bf54dd5ee',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log({ profile });
            let user = await userService.findOne({ email: profile._json.email });
            if (user) return done(null, user);
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                age: 18,
                password: '', // Deja esto en blanco o asigna un valor predeterminado si es necesario
            };
            user = await userService.create(newUser);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Configuración de LocalStrategy para registro
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            let user = await userService.findOne({ email: username });
            if (user) return done(null, false);
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            };
            user = await userService.create(newUser);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Configuración de LocalStrategy para inicio de sesión
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.findOne({ email: username });
            if (!user) return done(null, false, { message: "User not found" });
            if (!validatePassword(user, password)) return done(null, false, { message: "Incorrect password" });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await userService.findOne({ _id });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
};

export default initializePassport;


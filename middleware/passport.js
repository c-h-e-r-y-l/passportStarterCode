const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require("../controllers/userController");
require('dotenv').config();

const githubLogin = new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        if (!profile) {
            return done(null, false);
        }

        const user = userController.getGithubUser(parseInt(profile.id));

        if (user) {
            return done(null, user);
        } else if (!user) {
            const id = parseInt(profile.id);
            const username = profile.displayName;
            const user = userController.addGithubUser(id, username);
            if (user) {
                return done(null, user);
            }
        } else {
            return done(null, false);
        }
    }
);

const localLogin = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are not valid. Please try again",
            });
    }
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin).use(githubLogin);

'use strict';

require('dotenv').config();
const express = require('express');
const passport = require("passport");
const session = require('express-session');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


///// CUSTOM MODULES /////

// FUNCTIONS //
const dbFirstInitialization = require('./customModules/db/db.firstInitialization');

// AUTHENTICATION CHECK //
const authenticationCheck = require('./customModules/authentication/authenticationCheck');

// FIND //
const {findList} = require('./customModules/find');

// MODELS //
const { User } = require('./customModules/db/db.dataModels');

// ROUTES //
const play = require('./customModules/routes/play');
const dashboard = require('./customModules/routes/dashboard');
const notifications = require('./customModules/routes/notifications');
const wallet = require("./customModules/routes/wallet");
const admin = require("./customModules/routes/admin");
const tournament = require("./customModules/routes/tournament");

////////////////////////


// domain root
const domainRoot = process.env.DOMAIN_ROOT;



// Set up our app on express
const app = express();

// app 
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // The response from the server is sent using this
app.use(express.static('dist/resources'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/play', authenticationCheck, play);
app.use('/dashboard', authenticationCheck, dashboard);
app.use('/notifications', authenticationCheck, notifications);
app.use('/wallet', authenticationCheck, wallet);
app.use('/admin', authenticationCheck, admin);
app.use('/tournament', tournament);
// app.use('/notifications', notifications);


///////////////////////////////////// DATABASE /////////////////////////////////////

// INITIALIZE ALL THE DATA FOR THE FIRST TIME (This is done to make the website a single step install) //
// The function will be called everytime the website server is started / restarted //
dbFirstInitialization();

/////////////////////////////////////////////////////////////////////////////////

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: domainRoot + "auth/google/madfangs", // change this to when uploading to server
    passReqToCallback   : true,
    userProfileUrl: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id },
            {
                email: profile.email || '',
                username: profile.email.substr(0, profile.email.indexOf('@')),
                firstName: profile.given_name || 'user',
                lastName: profile.family_name || '',
                profileImgLink: profile.picture || '',
                accessToken: accessToken || '',
                time: Date.now(),
                exp: 0,
                friendsList: [],
                friendRequest: [],
                accountBalance: 0,
                accountCurrency: 'INR',
                ignList: [],
                notifications: [],
                transactions: []
            },
            function (err, user) {
                if(err) {
                    console.log(err);
                    return done(err, false);
                }
                return done(null, user);
            });
    }
));


///////////////////////////////////// ROUTING /////////////////////////////////////
// root directory
app.get('/', (req, res)=>{
    if(req.isAuthenticated && req.isAuthenticated()) {
        res.redirect('/play'); // redirect to /play when logged in
        return;
    }

    findList('game', data=>{
        // REMOVE THE 'type' KEY-VALUE PAIR
        data.map(game=>{delete game.type});
        res.render('homepage', { domainName: domainRoot, games: JSON.stringify(data)});
    });
});

// logout //
app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

// Google O-Authentication
app.get('/auth/google',
    passport.authenticate('google', { scope: ["profile", "email"] }
));

app.get( '/auth/google/madfangs', 
    passport.authenticate( 'google', { 
        successRedirect: '/play',
        failureRedirect: '/auth/google/failure'
}));

app.use('/', (req, res)=>{
    res.send("404 Page not found");
})

// app listen
app.listen(3000, ()=>{
    console.log('listening to post 3000');
});
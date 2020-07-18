const { Schema } = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

////////////////////////// CREATE SCHEMA //////////////////////////

// GAMES //
const gamesSchema = new Schema({
    games: Array
});

// NAV BAR TABS //
const navBarTabsSchema = new Schema({
    navs: Array
});

// USER //
const userSchema = new Schema({
    username: String, // set by google
    firstName: {
        type: String,
        min: 1,
        max: 255,
    }, // set by google
    lastName: {
        type: String,
        min: 1,
        max: 255,
    }, // set by google
    email: String, // set by google
    googleId: String, // set by google
    accessToken: String, // set by google
    profileImgLink: String, // set by google
    time: Date, // set by google
    exp: Number,
    friendsList: Array,
    friendRequest: Array, // May or may not use this for the time
    accountBalance: Number, // In terms of lowest currency division. e.g. 50 INR = 5000
    accountCurrency: String,
    ignList: Array,
    notifications: Array,
    transactions: Array
});

const tournamentSchema = new Schema({
    tid : Number,
    hostedBy : String,
    game : String,
    state : String,
    tournamentName : String,
    maxPlayers : Number,
    dateAndTime : Date,
    gameMode : String,
    gameType : String,
    mapName : String,
    entryFees : Number,
    rewards : Array,
    registrations : Array
});

// plugin
userSchema.plugin(findOrCreate);

////////////////////////// EXPORT SCHEMA //////////////////////////

module.exports = {
    gamesSchema: gamesSchema,
    navBarTabsSchema: navBarTabsSchema,
    userSchema: userSchema,
    tournamentSchema: tournamentSchema
};
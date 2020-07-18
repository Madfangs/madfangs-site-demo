require('dotenv').config();
const mongoose = require('mongoose');

// CUSTOM MODULES IMPORT //
const { model } = require('mongoose');
const { gamesSchema, navBarTabsSchema, userSchema, tournamentSchema } = require('./db.dataSchema');

const databaseRoot = process.env.DATABASE_ROOT;

// Connect to the database
mongoose.connect(databaseRoot, {useNewUrlParser: true, useUnifiedTopology: true });

////////////////////////// CREATE MODELS //////////////////////////

// GAMES //
const Game = model('Game', gamesSchema);

// NAV BAR TABS //
const Nav = model('Nav', navBarTabsSchema);

// USER //
const User = model('User', userSchema);

// TOURNAMENT //
const Tournament = model('Tournament', tournamentSchema);

////////////////////////// EXPORT MODELS //////////////////////////
module.exports = {
    Game: Game,
    Nav: Nav,
    User: User,
    Tournament: Tournament
}
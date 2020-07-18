'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const escape = require("escape-html");
const decode = require('unescape');

// custom modules //

const {findList} = require('../find');


///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT;

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

// all routes are respective to domainName + 'play'

/* The play page slides */
const slides = [
    {
        id: 1,
        heading: 'Welcome to madfangs',
        body: 'There are a lot of things you can explore'
    },
    {
        id: 2,
        heading: 'Check out all our games',
        body: 'We have a lot of games for you to play'
    },
    {
        id: 3,
        heading: 'Compete in a tournament',
        body: 'We host a lot of tournaments for all these games.'
    }
];
/* ******************** */

router.get('/', (req, res)=>{
    findList('game', games=>{
        // remove type from the games array
        games.map(game=>{delete game.type});

        // if a particular game info is requested as a query or else load the first game.
        const gm = req.query.game || games[0].id;

        findList('nav', navs=>{
            // res.render('playpage', {nav: JSON.stringify(navs), games: JSON.stringify(games), showingForGame: gm});

            res.render('playpage', {data: JSON.stringify({
                "domainName": domainName,
                "navigationFull": navs,
                "activeNav": "play",
                "gameCategories": games,
                "showingForGame": gm,
                "rankStatsGraphData": [],
                "topPlayers": [],
                "tournamentsList": [],
                "scrimsList": [],
                "slides": slides
            })});
        });
    });
});

// export the router //

module.exports = router;
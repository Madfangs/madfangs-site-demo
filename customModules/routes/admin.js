'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();

///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT;

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

// custom modules
const getGames = require("../functions/getGames");
const createNewTournament = require("../functions/createNewTournament");
const activeTournamentsList = require("../functions/activeTournamentsList");

/* ************ */
// VARIABLE INITIALIZATION

const navigationFull = [
    {
        name : "tournament",
        link : "admin/tournament"
    }
];

const games = [
    {
        id: "fortnite",
        name: "Fortnite"
    },
    {
        id: "pubgm",
        name: "PUBG Mobile"
    },
    {
        id: "csgo",
        name: "CS-GO"
    },
    {
        id: "lol",
        name: "League of Legends"
    },
    {
        id: "pubg",
        name: "PUBG"
    },
    {
        id: "apexlegends",
        name: "Apex Legends"
    },
    {
        id: "rainbowsixsiege",
        name: "Rainbow Six Siege"
    },
    {
        id: "8ballpool",
        name: "8-Ball Pool"
    },
    {
        id: "clashroyale",
        name: "Clash Royale"
    },
    {
        id: "freefire",
        name: "Free-Fire"
    }
];

const admins = process.env.ADMINS.split('/');

/* ******************* */

router.get('/', (req, res)=>{
    let accessGranted = false;

    // check if user is a valid admin
    admins.forEach(admin=>{
        if(req.user.email === admin)
            accessGranted = true;
    });

    // if the user is a valid admin
    if(!accessGranted) {
        res.send(`<script>window.location.replace("${domainName}play")</script>`);
    } else {
        res.send(`<script>window.location.replace("${domainName}admin/tournament")</script>`);
    }
});

router.get('/tournament', (req, res)=>{
    let accessGranted = false;

    // check if user is a valid admin
    admins.forEach(admin=>{
        if(req.user.email === admin)
            accessGranted = true;
    });

    // if the user is a valid admin
    if(!accessGranted) {
        res.send(`<script>window.location.replace("${domainName}play")</script>`);
        return;
    }

    res.render("adminpage", {domainRoot : domainName, data : JSON.stringify(
        {
            "domainName": domainName,
            "navigationFull" : navigationFull,
            "activeNav" : "admin/tournament",
            "games" : games
        }
    )});


    // getGames()
    //     .then(info=>{
    //         res.render("adminpage", {domainRoot : domainName, data : JSON.stringify(
    //             {
    //                 "domainName": domainName,
    //                 "navigationFull" : navigationFull,
    //                 "activeNav" : "admin/tournament",
    //                 "games" : info
    //             }
    //         )})
    //     })
    //     .catch(err=>{if (err) {console.log(err); res.status(500).json( {err: true, msg : "Internal Server Error! Please try again later"} )} });
})

router.post('/new-tournament', (req, res)=>{
    let accessGranted = false;

    // check if user is a valid admin
    admins.forEach(admin=>{
        if(req.user.email === admin)
            accessGranted = true;
    });

    // if the user is a valid admin
    if(!accessGranted) {
        res.send(`<script>window.location.replace("${domainName}play")</script>`);
        return;
    }

    let data = req.body;
    
    createNewTournament(req.user.username, data, res)
        .then(info=>{})
        .catch(err=>{
            if (err)
                console.log(err);
        });
});

router.get('/active-tournaments', (req, res)=>{
    let accessGranted = false;

    // check if user is a valid admin
    admins.forEach(admin=>{
        if(req.user.email === admin)
            accessGranted = true;
    });

    // if the user is a valid admin
    if(!accessGranted) {
        res.status(400).json({err: true, msg: "Access denied!"});
        return;
    }


    activeTournamentsList(res)
        .then(info=>{})
        .catch(err=>{
            if (err)
                console.log(err);
        });
    
})

// export the router //

module.exports = router;
'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();

///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT;

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // The response from the server is sent using this

/* ************* */
// CUSTOM MODULES

const getNavigationsList = require("../functions/getNavigationsList");
const getTournamentDetails = require("../functions/getTournamentDetails");
const prepareTournamentRegistrationPayment = require("../functions/prepareTournamentRegistrationPayment");
const confirmTournamentRegistration = require("../functions/confirmTournamentRegistration");

/* ************* */

let navList = [
    {
        name: "play",
        link: "play"
    },
    {
        name: "clan",
        link: "clan"
    },
    {
        name: "dashboard",
        link: "dashboard"
    },
    {
        name: "notifications",
        link: "notifications"
    },
    {
        name: "br",
        link: "br"
    },
    {
        name: "host tournament",
        link: "host-tournament"
    },
    {
        name: "leaderboards",
        link: "leaderboards"
    },
    {
        name: "earn rewards",
        link: "earn-rewards"
    },
    {
        name: "about us",
        link: "about-us"
    }
];

router.get('/tid/:tid', (req, res)=>{
    let tid = parseInt(req.params.tid), t = "";

    if (req.query) {
        if (req.query.t)
            t = req.query.t;
    }

    res.render("tournamentformpage", {domainRoot : domainName, data : JSON.stringify(
        {
            "domainName" : domainName,
            "navigationFull" : navList,
            "activeNav" : "",
            "tid" : tid,
            "maxPossibleParticipants" : 4, // not used
            "t" : t
        }
    ) });

    // getNavigationsList()
    //     .then(data=>{
    //         res.render("tournamentformpage", {domainRoot : domainName, data : JSON.stringify(
    //             {
    //                 "domainName" : domainName,
    //                 "navigationFull" : data,
    //                 "activeNav" : "",
    //                 "tid" : tid,
    //                 "maxPossibleParticipants" : 4, // not used
    //                 "t" : t
    //             }
    //         ) });
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //         res.status(500).json({err: true, msg: "Internal Server Error! Please try again later."});
    //     })
});

router.get('/tid/:tid/details', (req, res)=>{
    let tid = parseInt(req.params.tid);
    getTournamentDetails(tid, res)
        .then(info=>{})
        .catch(err=>{
            console.log(err);
        })
});

router.post('/tid/:tid/register', (req, res)=>{
    let body = {...req.body};

    if (req.query) {
        if (req.query.t)
            body = {...req.body, t : req.query.t};
    }

    prepareTournamentRegistrationPayment(body, res)
        .then(info=>{})
        .catch(err=>{
            console.log(err);
        });
})

router.post('/tid/:tid/register/success', (req, res)=>{
    let tid = parseInt(req.params.tid);
    confirmTournamentRegistration(tid, req.body, res)
        .then(info=>{})
        .catch(err=>{
            console.log(err);
        })
})

// export the router //

module.exports = router;
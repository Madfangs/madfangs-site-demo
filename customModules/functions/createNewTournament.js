// This fuction will create a new tournament entry in the database and will provide a response to the user.
// The function requires, the username of the user who hosted, the data for the tournament, the res object to respond to the user.
// This function doesn't return anything and is independent

// Sanitize input
// generate tournament ID
// check if tournament ID already exists
// create the tournament element and insert into database

const {Tournament} = require("../db/db.dataModels");

async function createNewTournament (username, data, res) {
    let errorMsg, done = false;

    // Sanitize input
    let game = data.game.toString().trim(),
    tournamentName = data.tournamentName.toString().trim(),
    maxPlayers = parseInt(data.maxPlayers), 
    date = data.date.toString().trim(),
    time = data.time.toString().trim(),
    gameMode = data.gameMode.toString().trim(),
    gameType = data.gameType.toString().trim(),
    mapName = data.mapName.toString().trim(),
    entryFees = parseInt(data.entryFees),
    rewards=[];
    data.rewards.forEach(rewarding=>{
        let position = parseInt(rewarding.position);
        let reward = parseInt(rewarding.reward);

        rewards.push({
            position: position,
            reward : reward
        })
    });

    // generate tournament ID
    let tid, tidNotfound = false;
    while (true) {
        tid = Math.floor(Math.random() * Math.pow(10,20));

        // check if tournament ID already exists
        await Tournament.findOne({tid: tid}, (err, data)=>{
            if (err) {
                console.log(err);
                errorMsg = {err: true, msg: err};
                res.status(500).json(errorMsg);
                return;
            }
            if (!data) { 
                tidNotfound = true;
            }
        });

        if(tidNotfound || errorMsg) {
            break;
        }
    }

    // create the tournament element and insert into database
    if(!errorMsg && !done) {
        let newTournament = {
            tid : tid,
            hostedBy : username,
            game : game || "",
            state : "active",
            tournamentName : tournamentName || "",
            maxPlayers : maxPlayers || 100,
            dateAndTime : new Date(date + " " + time + " GMT+0530"),
            gameMode : gameMode || "TPP",
            gameType : gameType || "solo",
            mapName : mapName || "default",
            entryFees : entryFees || 0,
            rewards : rewards,
            registrations : []
        }
        let tournament = new Tournament(newTournament);

        await tournament.save((err)=>{
            if (err) {
                console.log(err);
                errorMsg = {err: true, msg : err};
                res.status(500).json(errorMsg);
                return;
            }
            // done = true;
        });

        done = true;
    } else return;

    if (!errorMsg) {
        if(done) {
            res.status(200).json({done: true, tid: tid});
        } else {
            res.status(500).json({err: true, msg: "Internal Server Error! Please try again later"});
        }
    } else return;
}

module.exports = createNewTournament;
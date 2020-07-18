// This function retrieves the active tournaments from the database, prepares it and sends it to the user
// The function is asynchtonous and takes in the res object to respond to the user
// The function returns no value.


// Retrieve the tournaments list from the database
// Send the information to the user

const {Tournament} = require("../db/db.dataModels");

async function activeTournamentsList (res) {
    let errorMsg, done = false, activeTourneyList = [];

    // Retrieve the tournaments list from the database
    await Tournament.find({state : "active"}, (err, data)=>{
        if (err) {
            console.log(err);
            errorMsg = {err: true, msg : err};
            res.status(500).json(errorMsg);
            return;
        }

        data.forEach(elem=>{
            let tournamentName = elem.tournamentName, state = elem.state, tid = elem.tid, game = elem.game, registrations = elem.registrations, maxPlayers = parseInt(elem.maxPlayers), slots = 0, slotsMax, gameType = elem.gameType;

            if(registrations) {
                registrations.forEach(register=> {
                    if (register.payment === "done")
                        slots++;
                });
            }

            if (gameType === "solo") {
                slotsMax = maxPlayers;
            } else if (gameType === "duo") {
                slotsMax = Math.floor(maxPlayers / 2);
            } else if (gameType === "trio") {
                slotsMax = Math.floor(maxPlayers / 3);
            } else if (gameType === "squad") {
                slotsMax = Math.floor(maxPlayers / 4);
            }

            activeTourneyList.push({
                tid : tid,
                tournamentName : tournamentName,
                game : game,
                slots : slots,
                slotsMax : slotsMax,
                state : state,
                gameType : gameType
            });
        });
        
        done = true;
    });

    if(!errorMsg) {
        if (done) {
            res.status(200).json(activeTourneyList);
        } else {
            res.status(500).json({err: false, msg: "Something went wrong! Please try again later"});
        }
    } else return;

}

module.exports = activeTournamentsList;
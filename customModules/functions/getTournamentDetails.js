// This asynchronous function, takes as parameters the tournament ID (tid) of the tournament and the res object to respond to the user as arguments and, responds to the user i.e. sends the tournament details to the user.

// Sanitize input
// Fetch the tournament data from the database
// Return the data to the user

const { Tournament } = require("../db/db.dataModels");

async function getTournamentDetails (tid, res) {
    let errorMsg, done = false, returnData;

    // Sanitize input
    let tidSanitized = parseInt(tid) || 0;

    // Fetch the tournament data from the database
    while (true) {
        await Tournament.findOne({tid : tidSanitized}, (err, data)=>{
            if (err) {
                console.log(err);
                errorMsg = {err: true, msg : err};
                res.status(500).json("Internal Server Error! Please try again later.");
                return;
            }
    
            // Precaution against errors
            if (!data) {
                errorMsg = {err : false, msg : "Tournament not found!"};
                res.status(400).json(errorMsg);
                return;
            }
    
            let slots = 0, slotsMax;
    
            data.registrations.forEach (register=>{
                if (register.payment === "done") {
                    slots++;
                }
            })
    
            if (data.gameType === "solo")
                slotsMax = parseInt(data.maxPlayers);
            else if (data.gameType === "duo")
                slotsMax = parseInt(data.maxPlayers / 2)
            else if (data.gameType === "trio")
                slotsMax = parseInt(data.maxPlayers / 3)
            else if (data.gameType === "squad")
                slotsMax = parseInt(data.maxPlayers / 4)
    
            returnData = {
                tid : data.tid || 0,
                rewards : data.rewards || [],
                game : data.game || "",
                state : data.state || "",
                tournamentName : data.tournamentName || "",
                slots : slots || 0,
                slotsMax : slotsMax || 0,
                dateAndTime : data.dateAndTime || "",
                gameMode : data.gameMode || "",
                gameType : data.gameType || "",
                mapName : data.mapName || "",
                entryFees : data.entryFees || 0
            };

            if (data.tid)
                done = true;
        });

        if (done)
            break;
    }

    

    // Return the data to the user
    if (!errorMsg) {
        // if (done) {
            res.status(200).json(returnData);
        // } else {
        //     res.status(200).json({err: false, msg: "Something is wrong! Please try again later."})
        // }
    } else return;
}

module.exports = getTournamentDetails;
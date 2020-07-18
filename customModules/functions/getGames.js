// This is an async function that takes no parameters and returns a promise containing the list/array  of games in the database, as an array of objects (with no 'type' property) , or returns an error object for error.
// This function can be directly used to send games list in the database to the user.

const {Game} = require("../db/db.dataModels");

async function getGames () {
    let returnData;

    await Game.findOne({}, (err, data)=>{
        if(err) {
            console.log(err);
            returnData = {err: true, msg : err};
            return;
        } else {
            data.games.map(game=>{delete game.type});
            returnData = data.games;
        }
    });

    return returnData;
}

module.exports = getGames;
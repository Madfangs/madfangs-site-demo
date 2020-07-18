// FUNCTIONS //
const { Game, Nav } = require('./db.dataModels');


// INITIAL DATA //
const { games } = require('../initializationData/gameCardData');
const { navBarTabs } = require('../initializationData/navBarTabs');

///////////////////////////////////// FUNCTIONS /////////////////////////////////////

// INITIALIZE THE GAMES IN THE DATABASE //
function gamesDataInitialization() {
    // create a document //
    const gm = new Game({
        games: games
    });

    // save document //
    gm.save(err=>{
        if(err) console.log(err);
    });
}

// INITIALIZE THE NAV BAR TABS IN THE DATABASE //
function navBarTabsInitialization() {
    // create document //
    const nv = new Nav({
        navs: navBarTabs
    })

    // save document //
    nv.save(err=>{
        if(err) console.log(err);
    });
}


///////////////////////////////////// MASTER FUNCTION /////////////////////////////////////
module.exports = function dbPagesInitialization() {

    // CHECK IF GAMES ARE INITIALIZED
    Game.find({}, (err, data)=>{
        if(err) console.log(err);
        else if (data.length === 0) gamesDataInitialization();
    });

    // CHECK IF NAV BAR TABS ARE INITIALIZED //
    Nav.find({}, (err, data)=>{
        if(err) console.log(err);
        else if (data.length === 0) navBarTabsInitialization();
    });
}
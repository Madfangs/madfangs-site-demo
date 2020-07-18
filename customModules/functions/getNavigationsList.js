// This asynchronous function takes no paramenters and returns the navigations list from the database as a promise containing an array of objects

const {Nav} = require("../db/db.dataModels");

async function getNavigationsList () {
    let returnData;

    await Nav.findOne({}, (err, data)=>{
        if(err) {
            console.log(err);
            returnData = {err: true, msg : err};
            return;
        } else {
            returnData = data.navs;
        }
    });

    return returnData;
}

module.exports = getNavigationsList;
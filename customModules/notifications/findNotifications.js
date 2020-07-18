const {User} = require('../db/db.dataModels');

// The functions return a promise with the retrieved data

async function findNotificationsById(id) {
    let returnData = undefined;

    // find the user
    await User.findById(id, (err, data)=>{
        if(err) {
            returnData = {err: true, msg: err};
            console.log(returnData);
        } else {
            if(data.notifications)
                returnData = data.notifications;
            else
                returnData = [];
        }
    });
    return returnData;
}

// export module

module.exports = {
    findNotificationsById: findNotificationsById,
}
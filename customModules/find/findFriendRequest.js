const {User} = require('../db/db.dataModels');

// functions in this module return a promise along with the data

async function findFriendRequestByUsername (username) {
    let friendRequest = undefined;
    // find the user
    await User.findOne({username: username}, (err, data)=>{
        // get his friendRequestList
        friendRequest = data.friendRequest;
    });

    return friendRequest;
}

// export modules

module.exports = {
    findFriendRequestByUsername: findFriendRequestByUsername
}
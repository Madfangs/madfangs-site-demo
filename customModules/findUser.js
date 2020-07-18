const {User} = require('./db/db.dataModels');

async function findByUsername(username) {
    let user = undefined;
    await User.findOne({username: username}, (err, data)=>{
        if(err) {
            user = {err: true, msg: err};
            console.log(user);
        }
        else
            user = data
    });
    return user;
}

// export modules

module.exports = {
    findByUsername: findByUsername
}
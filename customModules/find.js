const {Game, Nav} =  require("./db/db.dataModels");


function findList(model ,callback) {
    let t = undefined;
    if(model === 'game') // GAMES LIST // 
        Game.find({}, (err, data)=>{
            if(err) {console.log(err); callback(t);}
            else if(data.length !== 0) {
                t = data[0].games;
                callback(t);
            }
            else callback(t);
        });
    else if(model === 'nav') // NAV LIST //
        Nav.find({}, (err, data)=>{
            if(err) {console.log(err); callback(t);}
            else if(data.length !== 0) {
                t = data[0].navs;
                callback(t);
            }
            else callback(t);
        });
    else callback(t);
}

 // NAV LIST //


module.exports = {
    findList: findList
}

'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');
const escape = require("escape-html");
const decode = require('unescape');

///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT; // CHANGE THIS LATER

// CUSTOM MODULES //
const {User} = require("../db/db.dataModels");

// FIND
const {findList} = require('../find');
const {findByUsername} = require('../findUser');
const {findFriendRequestByUsername} = require('../find/findFriendRequest');
const sendFriendRequest = require("../functions/sendFriendRequest");

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());




// Routes are relative to domainRoot + 'dashboard' //

router.get('/', (req, res)=>{
    if(req.user && req.user.username) {
        res.redirect('/dashboard/' + req.user.username);
    } else res.redirect('/'); // Safe Guard
});

router.get('/:username', (req, res)=>{

    if(req.user && req.user.username && req.params.username === req.user.username) { 

        // THE USER IS LOGGED IN AND IS VISITING HIS OWN DASHBOARD

        findList('game', games=> {
            games.map(game=> delete game.type);
            findList('nav', navFull =>{

                // check data from database before sending to client //

                let username = req.user.username || '';
                let email = req.user.email || '';
                let firstName = decode(req.user.firstName) || '';
                let lastName = decode(req.user.lastName) || '';
                let exp = req.user.exp || 0;
                let accountBalance = req.user.accountBalance || 0;
                let accountCurrency = req.user.accountCurrency || 'INR';
                let numOfFriends = req.user.friendsList ? req.user.friendsList.length : 0;
                let profileImgLink = req.user.profileImgLink || domainName + 'img/svg/dummy.svg';
                let ignList = [];
                req.user.ignList.forEach(item=>{
                    let ign = decode(item.ign);
                    let gameName = decode(item.game.name);
                    let gameId = decode(item.game.id);

                    ignList.push({ign: ign, game: {name: gameName, id: gameId}});
                });

                //////////////////////////////////////////////////////

                res.render('dashboardpage', {
                    domainRoot: domainName,
                    data: JSON.stringify({
                        "editable": true,
                        "navigationFull": navFull,
                        "activeNav": "dashboard",
                        "domainName": domainName,
                        "numOfFriends": numOfFriends,
                        "exp": exp,
                        "profileImg": profileImgLink,
                        "firstName": firstName,
                        "lastName": lastName,
                        "username": username,
                        "email": email,
                        "accountBalance": accountBalance,
                        "accountCurrency": accountCurrency,
                        "games": games,
                        "ignList": ignList
                    })
                });
            });
        });

    } else {
        // retrive data from database secure it and then send it the dashboardviewpage //
        findList('game',games=>{
            games.map(game=>delete game.type);
            findList('nav', navFull=>{
                // Retrieve the user from the database
                User.findOne({username: req.params.username}, (err, user)=>{
                    if(err) {
                        console.log(err);
                        res.status(500).json({err: true, msg: "Server Error! Please try again later."});
                    } else {

                        let username = user.username || '';
                        let firstName = decode(user.firstName) || '';
                        let lastName = decode(user.lastName) || '';
                        let imageLink = user.profileImgLink || domainName + 'img/svg/dummy.svg';
                        let exp = user.exp || 0;
                        
                        // CHECK IF THE USER IS AVAILABLE TO BE ADDED AS FRIEND
                        let available = true;

                        // the use is not available if

                        // they are already friends (checking your own friendsList)
                        req.user.friendsList.forEach(friend=>{
                            if(friend.username === user.username)
                                available = false;
                        })

                        // you are requesting your own page
                        if(req.user.username === user.username)
                            available = false;

                        // the user has already received a friendrequest from you
                        user.friendRequest.forEach(request=>{
                            if(request.requestFrom === req.user.username)
                                available = false;
                        })


                        res.render('dashboardviewpage', {
                            domainRoot: domainName,
                            data: JSON.stringify({
                                "editable": false,
                                "domainName": domainName,
                                "username": username,
                                "firstName": firstName,
                                "lastName": lastName,
                                "exp": exp,
                                "profileImg": imageLink,
                                "navigationFull": navFull,
                                "activeNav": "dashboard",
                                "available": available
                            })
                        })
                    }
                })
            })
        })
    } 

});

router.get('/:username/friends', (req, res)=>{
    // ACCESSIBLE ONLY WHEN THE USER REQUESTING IT IS LOGGED IN //
    // CAN ACCESS HIS OWN FRIEND LIST ONLY //
    if(req.user && req.user.username && req.params.username === req.user.username) {
        let friendsList = req.user.friendsList;
        let newFriendsList = [];
        friendsList.map(friend=>{
            let newObj = {...friend, imageLink: friend.profileImgLink};
            delete newObj.profileImgLink;
            newFriendsList.push(newObj);
        })
        res.status(200).json(newFriendsList);
    } else {
        res.status(404).json({err: true, msg: "Invalid Request"});
    }
});

router.post('/:username/ign-update',(req, res)=>{
    if(req.params.username !== req.user.username) {
        res.status(400).json({err: true, msg: "Access Denied!"});
        return;
    }
    findList('game', games=>{

        async function handleIgnData() {

            function receiveData() {
                if(req.body) return req.body;
                else return undefined;
            }

            function checkForValidObject(input) {
                /* [{ign: String, game: {name: String, id: String}}] */
                let result = input;
                input.forEach(inp=>{
                    if(!inp.ign && !inp.game && !inp.game.name && !inp.game.id) result = undefined;
                })
                return result;
            }

            function checkLengthForEach(input) {
                /* Minimum length for ign -> 3 and minimum for game(obj).String -> 3 and max for all -> 255 */
                let result = input;
                input.forEach(inp=>{
                    if(inp.ign.length < 3 || inp.ign.length > 255 || inp.game.name.length < 2 || inp.game.name.length > 255 || inp.game.id.length < 2 || inp.game.id.length > 255){
                        result = undefined;
                    }
                })
                
                return result;
            }

            function sanitize(input) {
                let newArray = [];

                input.forEach(inp=>{
                    let ign = escape(inp.ign.toString().trim().replace(/  +/g, ' '));
                    let name = escape(inp.game.name.toString().trim().replace(/  +/g, ' '));
                    let id = escape(inp.game.id.toString().trim().replace(/  +/g, ''));

                    let newObj = {
                        ign: ign,
                        game: {
                            name: name,
                            id: id
                        }
                    };

                    newArray.push(newObj);
                });
                return newArray;
            }

            function allowSingleField(input) {
                let finalArray = [];
                input.reverse();
                input.forEach(inp=>{
                    let check = true;
                    finalArray.forEach(element=>{
                        if(element.ign === inp.ign || element.game.name === inp.game.name || element.game.id === inp.game.name) {
                            check = false;
                        }
                    });
                    if(check) {
                        finalArray.push(inp);
                    }
                });
                finalArray.reverse();
                return finalArray;
            }

            function allowFieldsInDatabaseToPass(input) {
                // check if the games exist in database
                let finalArray = [];
                input.forEach(inp=>{
                    games.forEach(game=>{
                        if(game.name === inp.game.name && game.id === inp.game.id) {
                            finalArray.push(inp);
                        }
                    });
                });
                return finalArray;
            }

            try {
                const jsonInput = await receiveData();
                const validJson = await checkForValidObject(jsonInput);
                const validData = await checkLengthForEach(validJson);
                const sanitizedData = await sanitize(validData);
                const singleFieldData = await allowSingleField(sanitizedData);
                const databaseReadyData = await allowFieldsInDatabaseToPass(singleFieldData);
                await User.updateOne({_id: req.user._id}, {ignList: databaseReadyData}, (err)=>{if (err) console.log(err);});

                return databaseReadyData;
            } catch (err) {
                res.status(400).json({err: true, msg: "Invalid data"});
                console.log(err);
            }
        }

        handleIgnData()
            .then(data=>{
                let newObj = [];
                data.forEach(item=>{
                    let ign = decode(item.ign);
                    let gameName = decode(item.game.name);
                    let gameId = decode(item.game.id);

                    newObj.push({ign: ign, game: {name: gameName, id: gameId}});
                });

                res.status(200).json(newObj);
            })
            .catch(err=>{res.status(500); console.log('Async err : ',err);})
    });
});

router.post('/:username/updateprofile', (req, res)=>{
    if(req.params.username !== req.user.username) {
        res.status(400).json({err: true, msg: "Access Denied!"});
        return;
    }
    if(!req.body.async) {
        console.log('not async');
    }

    async function handleUserData() {

        function receiveData() {
            if(req.body) return req.body;
            else return undefined;
        }

        function checkForValidObject(input) {
            /* {firstName : String, lastName: String} */
            if(input.firstName && input.lastName) return input;
            return undefined;
        }

        function checkLengthForEach(input) {
            /* min: 1, max: 255 */
            if(input.firstName.length < 1 || input.firstName.length > 255 || input.lastName.length < 1 || input.lastName.length > 255)
                return undefined;
            return input;
        }

        function sanitize(input) {
            let firstName = escape(input.firstName.toString().trim().replace(/  +/g, ' '));
            let lastName = escape(input.lastName.toString().trim().replace(/  +/g, ' '));

            let newObj = {
                firstName: firstName,
                lastName: lastName
            }
            return newObj;
        }

        try {
            const jsonInput = await receiveData();
            const validJson = await checkForValidObject(jsonInput);
            const validData = await checkLengthForEach(validJson);
            let sanitizedData = await sanitize(validData);
            await User.updateOne({_id: req.user._id}, {firstName: sanitizedData.firstName, lastName: sanitizedData.lastName}, (err)=>{if (err) console.log(err);});

            return sanitizedData;
        } catch {
            res.status(400).json({err: true, msg: "Invalid data"});
            console.log(err);
        }
    }

    handleUserData()
        .then(data=>{
            let firstName = decode(data.firstName);
            let lastName = decode(data.lastName);
            let newObj = {
                firstName: firstName,
                lastName: lastName
            }
            res.status(200).json(newObj);
        })
        .catch(err=>{res.status(500); console.log('Async err : ',err);})
});

router.post('/:username/searchuser', (req, res) => {
    let available = true;
    
    async function handleSearchRequest() {
        let returnData = undefined;

        function receiveData() {
            if(req.body) return req.body;
            else return undefined;
        }

        function checkForValidObject(input) {
            /* searchQuery = String */
            if(input.searchQuery) return input;
            return undefined;
        }

        function checkLengthForEach(input) {
            if(input.searchQuery.length < 1 || input.searchQuery.length > 255)
                return undefined;
            return input;
        }

        function sanitize(input) {
            let searchQuery = escape(input.searchQuery.toString().trim().replace(/  +/g, ' '));

            let newObj = {
                searchQuery: searchQuery
            }
            return newObj;
        }

        function testAvailablility(input) {
            // if the searchQuery is himself
            if(input.searchQuery === req.user.username) {
                available = false;
            }
            // OR if the searchQuery is already a friend.
            if(req.user.friendsList.length > 0) {
                let friendsList = req.user.friendsList;
                friendsList.map(list=>{
                    if(list.username === input.searchQuery)
                        available = false;
                })
            }
            
            // OR if the user has already sent a friendRequest
            // this check is made in the User.findOne section below
        }

        try {
            const jsonInput = await receiveData();
            const validJson = await checkForValidObject(jsonInput);
            const validData = await checkLengthForEach(validJson);
            let sanitizedData = await sanitize(validData);
            await testAvailablility(sanitizedData);
            if(sanitizedData.searchQuery)
                await User.findOne({ username: sanitizedData.searchQuery}, ['username', 'firstName', 'lastName', 'profileImgLink', 'friendRequest'], (err, data)=>{
                    // if data is null
                    if(!data) {
                        returnData === null;
                        return;
                    }
                    
                    // check if the user has already send a friend request
                    let friendRequest = data.friendRequest || [];
                    friendRequest.map(request=>{
                        if(request.username === req.user.username)
                            available = false;
                    });
                    delete data.friendRequest;
                    returnData = data;
                });
            if(returnData === null) return {err: false, msg: "Uh Oh! User not found"};
            return returnData;
        } catch (err) {
            res.status(400).json({err: true, msg: "Invalid data"});
            console.log(err);
        }
    }

    handleSearchRequest()
        .then(data=>{
            if (data) {
                if(data.msg) {
                    res.status(200).json(data);
                } else {
                    let newArray = []
                    let newObj = {
                        username: data.username,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        imageLink: data.profileImgLink,
                        available: available
                    }
                    newArray.push(newObj);
                    res.status(200).json(newArray);
                }
            } else {
                res.status(200).json({err: false, msg: "Uh Oh! User not found"});
            }
            
        })
        .catch(err=>{res.status(500); console.log('Async err : ',err);})
})

router.get('/:username/add-friend', (req, res)=>{
    console.log("Received request for " + req.params.username)
    sendFriendRequest(req.user, req.params.username, res);
    return;
})

// export the router //

module.exports = router;
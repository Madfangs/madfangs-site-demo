// create a function that takes in the user1 object (the user who sends the friend request) and also takes in the user name of user2 (the user to whom the friend request is sent) and the response object to respond to the client.
// This is a solo working function and can simply be included in the code.

// sanitize inputs

// get the user2 object from the database

// see if user1 and user2 are already friends (We will be checking if user1 is friends with user2)

// get the user2 object from the database

// see if user1 already sent a friend request to user2

// see if user2 already send a friend request to user1 (if true add them friends)

// Make friend request from user1 to user2

// Create a notification for user2 notifying him / her about the friend request

const express = require("express");
const {User} = require('../db/db.dataModels');

const app = express();


async function sendFriendRequest(user1, user2Username, res) {
    let user2, errorMsg, done;

    // sanitize inputs
    let user2UsernameSanitized = user2Username.toString().trim();

    // see if user1 and user2 are already friends (We will be checking if user1 is friends with user2)
    user1.friendsList.map(friend=>{
        if(friend.username === user2UsernameSanitized) {
            errorMsg = "You are already friends";
            res.status(400).json({err: true, msg: errorMsg}); // response to the client
            return;
        }
    })


    // get the user2 object from the database
    if (!errorMsg || !done)
        await User.findOne({username: user2UsernameSanitized}, (err, user)=>{
            if (err) {
                console.log(err, "user2 object from the database");
                errorMsg = "Internal Server Error : Please try again later.";
                res.status(500).json({err: true, msg: errorMsg}); // response to the client
                return;
            } else {
                user2 = user;
            }
        })
    else return;

    // see if user1 already sent a friend request to user2
    if(!errorMsg || !done)
        user2.friendRequest.map(request=>{
            if(request.username === user1.username) {
                errorMsg = "You have already sent a friend request";
                res.status(400).json({err: true, msg: errorMsg}); // response to the client
                return;
            }
        })
    else return;

    // see if user2 already send a friend request to user1 (if true add them friends)
    if(!errorMsg || !done) {
        let friendRequestSent = false;
        user1.friendRequest.map(request=>{
            if(request.username === user2.username)
                friendRequestSent = true;
        });
        if(friendRequestSent) {
            // if true
            let user1Listing = {
                username : user1.username,
                firstName : user1.firstName,
                lastName : user1.lastName,
                profileImgLink : user1.profileImgLink
            }, user2Listing =  {
                username : user2.username,
                firstName : user2.firstName,
                lastName : user2.lastName,
                profileImgLink : user2.profileImgLink
            },
            user1NewFriendsList = [...user1.friendsList, user2Listing],
            user2NewFriendsList = [...user2.friendsList, user1Listing];

            try {
                // database update requests are sent here.
                await User.updateOne({_id: user1._id}, {friendsList: user1NewFriendsList});
                await User.updateOne({_id: user2._id}, {friendsList: user2NewFriendsList});
                done = true;
                res.status(200).json({done: done}); // response to the client
                return;
            } catch (err) {
                if (err) {
                    console.log(err, "issue in making friends when both of them sent friend requests to each other");
                    errorMsg = "Internal Server Error. Please try again later.";
                    res.send(500).json({err: true, msg: errorMsg}); // response to the client
                    return;
                }
            }
        }
    } else return;


    // Make friend request from user1 to user2
    if(!errorMsg || !done) {
        let user1Listing = {
            username: user1.username
        },user2FriendRequestList = [...user2.friendRequest, user1Listing];

        await User.updateOne({_id: user2._id}, {friendRequest: user2FriendRequestList}, err=>{
            if(err) {
                console.log(err, "Send Friend request from user1 to user2");
                errorMsg = "Internal Server Error. Please try again later.";
                res.status(500).json({err: true, msg: errorMsg}); // response to the client
                return;
            }
        });
    } else return;


    // Create a notification for user2 notifying him / her about the friend request
    if(!errorMsg || !done) {
        // generate nid
        let nidFound = false, nid;
        while (true) {
            nid = Math.floor(Math.random() * Math.pow(10, 24)).toString(16);
            user2.notifications.map(notif=>{
                if(notif.nid === nid)
                    nidFound = true;
            })
            if(!nidFound)
                break;
        }
        let newNotification = {
            nid: nid,
            type: "fr1",
            requestFrom: user1.username,
            request: "pending",
            time: new Date()
        },newNotificationsList = [...user2.notifications, newNotification];

        await User.updateOne({_id: user2._id}, {notifications: newNotificationsList}, err=>{
            if (err) {
                console.log(err, "creating notifications for user2 after friend request from user1");
                errorMsg = "Internal Server Error! Please try again later.";
                res.status(500).json({err: true, msg: errorMsg});
                return;
            }
        });

        if(!errorMsg)
            res.status(200).json({done: true});
        return;       
    } else return;

}

module.exports = sendFriendRequest;
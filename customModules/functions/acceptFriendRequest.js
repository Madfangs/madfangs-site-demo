// Make a function that accepts the user1 object (the user who will be accepting the friend request), username of user2 (the user who sent the friend request), the res object to repond to the client

// Check if user2 sent a friend request to user1

// Check if user1 and user2 are already friends (we will check if user2 is in user1's friendsList)

// Get the user2 object form the database

// Make friends

// delete the friend request from user1

// Notify user1 that they are friends now  and user2 that user 1 has accepted the friend request

const express = require("express");

const {User} = require("../db/db.dataModels");
const findFriendRequest = require("../find/findFriendRequest");

async function acceptFriendRequest (user1, user2username, res) {
    // sanitize input
    let user2usernameSanitized = user2username.toString().trim();

    let user2, user1Modified, errorMsg, done;

    // Check if user2 sent a friend request to user1
    user1.friendRequest.map(request=>{
        if(request.username !== user2usernameSanitized) {
            errorMsg = "Something went wrong.";
            res.status(400).json({err: true, msg: errorMsg}); // response to user sent
            return;
        }
    });

    // Check if user1 and user2 are already friends (we will check if user2 is in user1's friendsList)
    if(!errorMsg || !done) {
        user1.friendsList.forEach(friend=>{
            if(friend.username === user2usernameSanitized) {
                errorMsg = "You are already friends.";
                res.status(400).json({err: true, msg: errorMsg});
                return;
            }
        })
        if(errorMsg) return;
    } else return;

    // Get the user2 object form the database
    if(!errorMsg || !done) {
        await User.findOne({username: user2usernameSanitized}, (err, data)=>{
            if(err) {
                console.log(err);
                errorMsg = "Internal Server Error. Please Try again later.";
                res.status(500).json({err: true, msg : errorMsg});
                return;
            }
            user2 = data;
        });
    } else return;

    // Make them friends
    if(!errorMsg || !done) {
        let user1Listing = {
            username: user1.username,
            firstName: user1.firstName || '',
            lastName: user1.lastName || '',
            profileImgLink : user1.profileImgLink
        }, user2Listing = {
            username : user2.username,
            firstName : user2.firstName,
            lastName : user2.lastName,
            profileImgLink : user2.profileImgLink
        }, user1NewFriendsList = [...user1.friendsList, user2Listing],
        user2NewFriendsList = [...user2.friendsList, user1Listing];

        // Update the database
        try {
            await User.updateOne({_id: user1._id}, {friendsList: user1NewFriendsList});
            await User.updateOne({_id: user2._id}, {friendsList: user2NewFriendsList});
        } catch (err) {
            if(err) {
                console.log(err);
                errorMsg = "Internal Server Error. Please try again later.";
                res.status(500).json({err: true, msg: errorMsg});
                return;
            }
        }
    } else return;

    
    // Delete friend request from user1 object
    if(!errorMsg || !done) {
        let user1NewFriendRequestList = [];

        user1.friendsList.forEach(request=>{
            if(request.username !== user2.username) {
                user1NewFriendRequestList.push(request);
            }
        });

        user1Modified = {...user1, friendRequest : user1NewFriendRequestList};
    } else return;

    // Notify user1 that they are friends now and user2 that user 1 has accepted the friend request
    if(!errorMsg || !done) {
        // generate nid function
        function generateNid (user) {
            let nid, nidFound;
            while (true) {
                nidFound = false;
                nid = Math.floor(Math.random() * Math.pow(10, 24)).toString(16);
                user.notifications.map(notif=>{
                    if(notif.nid === nid)
                        nidFound = true;
                })
                if(!nidFound)
                    break;
            }
            return nid;
        }

        let user1Notification, user1NewNotifications = [], user2Notification = {
            nid: generateNid(user2),
            type: "fr2",
            requestFrom: user1.username,
            request: "accepted",
            time: new Date()
        }, user2NewNotifications = [...user2.notifications, user2Notification];

        user1.notifications.forEach(notification => {
            if(notification.type === "fr1" && notification.requestFrom === user2.username && notification.request === "pending") {
                user1Notification = {...notification, request : "accepted"};
                user1NewNotifications.push(user1Notification);
            }
            else user1NewNotifications.push(notification);
        });

        // database request for (delete friend request of user1 and notify both users)
        try {
            await User.updateOne({_id: user1._id}, {notifications: user1NewNotifications, friendRequest : user1Modified.friendRequest});
            await User.updateOne({_id: user2._id}, {notifications: user2NewNotifications});
            done = true;
            res.status(200).json({done: done, request: "accepted"});
            return;
        } catch (err) {
            if(err) {
                console.log(err);
                errorMsg = "Internal Server Error. Please try again later.";
                res.status(500).json({err: true, msg: errorMsg});
                return;
            }
        }
    } else return;
}

module.exports = acceptFriendRequest;
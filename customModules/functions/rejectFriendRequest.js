// create a function that takes in the user1 object (the user who rejects the friend reques), the username of user2 (The user who's friendRequest is being rejected) and the res object to respond to the client

// remove the request from user2 to user1

// change the notification request to "rejected"

const express = require("express");
const { User } = require("../db/db.dataModels");

const app = express();

async function rejectFriendRequest (user1, user2Username, res) {
    // sanitize inputs
    let user2UsernameSanitized = user2Username.toString().trim();

    let errorMsg, done, user1NewNotificationsList = [], user1NewFriendRequestList = [];

    // remove the request from user2 to user1
    user1.friendRequest.forEach(request=>{
        if(request.username !== user2UsernameSanitized) {
            // building the request list of user1 excluding the request from user2
            user1NewFriendRequestList.push(request);
        }
    });

    // change the notification request to "rejected"
    if(!errorMsg || !done) {
        user1.notifications.forEach(notif=>{
            if(notif.type === "fr1" && notif.requestFrom === user2UsernameSanitized && notif.request === "pending") {
                let newNotif = {...notif, request: "rejected"};
                user1NewNotificationsList.push(newNotif);
            } else {
                user1NewNotificationsList.push(notif);
            }
        });
    } else return;

    // update the databse with the changes
    if(!errorMsg || !done) {
        await User.updateOne({_id: user1._id}, {friendRequest: user1NewFriendRequestList, notifications: user1NewNotificationsList}, err=>{
            if(err) {
                console.log(err);
                errorMsg = "Internal Server Error. Please try again later.";
                res.status(500).json({err: true, msg: errorMsg});
                return;
            }
        });

        if(!errorMsg) {
            done= true;
            res.status(200).json({done: done, request: "rejected"});
            return;
        }
    }
}

module.exports = rejectFriendRequest;
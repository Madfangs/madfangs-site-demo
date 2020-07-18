'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const escape = require("escape-html");
const decode = require('unescape');

// CUSTOM MODULES //
const {findList} = require('../find');
const {User} = require('../db/db.dataModels');
const {findNotificationsById} = require('../notifications/findNotifications');
const acceptFriendRequest = require("../functions/acceptFriendRequest");
const rejectFriendRequest = require("../functions/rejectFriendRequest");

///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT;

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

// Routes are relative to domainName + 'notifications' //

router.get('/', (req, res)=>{
    findList('nav', navFull=>{
        findNotificationsById(req.user._id)
            .then(data=>{
                let notifications = data;
                res.render('notificationpage', {domainRoot : domainName, data : JSON.stringify({
                        "navigationFull" :  navFull,
                        "activeNav": "notifications",
                        "domainName" : domainName,
                        "notifications": notifications
                    })
                })
            })
            .catch(err=>{res.status(500).send(); console.log("Async err : " ,err);});
    })
})

router.post('/numofnotifications', (req, res)=>{
    if(req.body.async !== true)
        res.redirect(domainName);
    else {
        findNotificationsById(req.user._id)
            .then(data=>{
                if(!data) return;
                let numOfNotifications = data.length;
                if(data.msg)
                    res.status(400).json(data);
                else
                    res.status(200).json({numOfNotifications: numOfNotifications});
            })
            .catch(err=>{res.status(500).send(); console.log("Async err : " ,err);});
    }
});

router.get('/remove/:nid', (req, res)=>{ // Remove notification
    // if type = fr1 and if that didnt respond then wait for the user to respond else remove the notification
    const nid = escape(req.params.nid.toString().trim());
    let readyToremove = true;

    // do the checks, if the notification can be removed or not
    req.user.notifications.map(notif=>{
        if(notif.nid === nid && notif.type === 'fr1') {
            if(notif.request === 'pending')
                readyToremove = false;
        }  
    });

    if(readyToremove) {
        // Remove the notification
        let errormsg = undefined;
        let newNotificationsList = [];
        req.user.notifications.map(notif=>{
            if(notif.nid !== nid)
                newNotificationsList.push(notif);
        });
        async function updateNotificationRemoval() {
            await User.updateOne({_id : req.user._id}, {notifications : newNotificationsList}, err=>{if(err) {errormsg = err; console.log(err);} });
            if(errormsg)
                return errormsg;
            else
                return true;
        }
        // let the user know the notification was removed
        updateNotificationRemoval()
            .then(data=>{
                if(data === true)
                    res.status(200).json({removed: true});
                else
                    res.status(500).json({err: true, msg: data});
            })
            .catch(err=>{console.log(err); res.status(500).json({err: true, msg: err});});
    } else {
        // let the user know the notification was not removed
        res.status(400).json({err: false, msg: 'Please respond to the friend request before removing.'})
    }
})

router.get('/friendrequest/:username/:response', (req, res)=>{ // accept or reject friend request
    const userSecondUsername = escape(req.params.username.toString().trim());
    const nid = escape(req.query.nid.toString().trim());
    if(req.params.response === "accept") {
        acceptFriendRequest(req.user, req.params.username, res);
    }
    else if(req.params.response === "reject") {
        rejectFriendRequest(req.user, req.params.username, res);
    }
})


// export the router //

module.exports = router;
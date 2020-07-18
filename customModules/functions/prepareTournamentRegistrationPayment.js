// This is an asynchronous function that accepts the tournament registration information, to prepare registation of the user, and the res object to respond to the user, and this retunrs a promise that contains nothing. The function is independent.


// check t

// Sanitize Input

// Cancel registration if user didn't enter contact information

// Get the tournament from the database

// check if slots full

// check if the teamName already exists in the database

// if tournament is solo, check if player1Ign already exists in database

// check if tournament is "active"

// Check if tournament is free entry

// generate receipt_id

// prepare order_id
// order has been created. Provide the required information to the server now.

// Store the information of the registration to the server and prepare for the user payment page

// Render the payment page to the user

require('dotenv').config();
const express = require("express");
const Razorpay = require("razorpay");

const {Tournament} = require("../db/db.dataModels");
const { body } = require('express-validator');

const app = express();

///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT;

// get keys from env variables
let auth = {
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
}

// Razor Pay API
const instance = new Razorpay({ // create an instance with key_id and key_secret
    key_id: auth.key_id,
    key_secret: auth.key_secret
})

async function prepareTournamentRegistrationPayment (data, res) {
    let errorMsg, done = false, tournament, receipt_id, orderId, returnData, amount = 0, playerCount = 0, tournamentIsFree = false, t = "";

    // check t
    if (data.t) {
        if (data.t !== "") {
            t = data.t;
        }
    }

    // Sanitize Input
    let tid, teamName, emailID, contactInfo, player1Name, player1Ign, player2Name, player2Ign, player3Name, player3Ign, player4Name, player4Ign;
    tid = parseInt(data.tid),
    data.teamName ? teamName = data.teamName.toString().trim() : teamName = "";
    data.contactInfo ? parseInt(contactInfo = data.contactInfo) : contactInfo = "";
    data.emailID ? emailID = data.emailID.toString().trim() : emailID = "";
    data.player1Name ? player1Name = data.player1Name.toString().trim() : player1Name = "";
    data.player1Ign ? player1Ign = data.player1Ign.toString().trim() : player1Ign = "";
    data.player2Name ? player2Name = data.player2Name.toString().trim() : player2Name = "";
    data.player2Ign ? player2Ign = data.player2Ign.toString().trim() : player2Ign = "";
    data.player3Name ? player3Name = data.player3Name.toString().trim() : player3Name = "";
    data.player3Ign ? player3Ign = data.player3Ign.toString().trim() : player3Ign = "";
    data.player4Name ? player4Name = data.player4Name.toString().trim() : player4Name = "";
    data.player4Ign ? player4Ign = data.player4Ign.toString().trim() : player4Ign = "";
    
    if (tid.length > 255 || teamName > 255 || player1Name > 255 || player1Ign > 255 || player2Name > 255 || player2Ign > 255 || player3Name > 255 || player3Ign > 255 || player4Name > 255 || player4Ign > 255) {
        errorMsg({err: true, msg: "Input too long (> 255)"});
        res.send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script>");
        return;
    }


    // Cancel registration if user didn't enter contact information
    if (!contactInfo || contactInfo.length === 0 || contactInfo === "") {
        errorMsg = {err: false, msg : "Please enter contact info to proceed"};
        res.status(400).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script>");
        return;
    }


    // Get the tournament from the database
    if (!errorMsg) {
        await Tournament.findOne({tid : tid}, (err, info)=>{
            if (err) {
                console.log(err);
                errorMsg = {err: true, msg : err};
                res.status(500).send("<script>alert('Internal Server Error! Please try again later.'); window.location.replace('" + domainName + "');</script>");
                return;
            }
            tournament = info;

            if (!tournament)
                res.status(500).send("<script>alert('Tournament not found.'); window.location.replace('" + domainName + "');</script>");

        })
    } else return;

    // check if slots full
    if (!errorMsg) {
        let successfulRegistrations = 0;
        tournament.registrations.forEach(register=> {
            if (register.payment === "done")
                successfulRegistrations++;
        });
        
        if (tournament.gameType === "solo")
            playerCount = 1;
        else if (tournament.gameType === "duo")
            playerCount = 2;
        else if (tournament.gameType === "trio")
            playerCount = 3;
        else if (tournament.gameType === "squad")
            playerCount = 4;

        let maxSlots = Math.floor(parseInt(tournament.maxPlayers) / playerCount);

        if (successfulRegistrations >= maxSlots) {
            errorMsg = {err: true, msg: "Oops! Slots are Full!"};
            res.status(400).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script> ");
            return;
        }
    } else return;

    // check if the teamName already exists in the database
    if (!errorMsg) {
        tournament.registrations.forEach(registration=>{
            if (registration.payment === "done" && registration.teamName === teamName) {
                errorMsg = {err: false, msg: "The Team Name has already been registered."};
                res.status(400).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script> ");
                return;
            }
        })
    } else return;

    // if tournament is solo, check if player1Ign already exists in database
    if (!errorMsg) {
        if (playerCount === 1) {
            tournament.registrations.forEach(register=>{
                if (register.payment === "done") {
                    register.participants.forEach(participant=>{
                        if (participant.ign === player1Ign) {
                            errorMsg = {err: false, msg: "The IGN has already been registered for this tournament."};
                            res.status(400).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script> ");
                            return;
                        }
                    })
                }
            })
        }
    } else if (errorMsg) return;

    // check if tournament is "active"
    if (!errorMsg) {
        if (tournament.state !== "active") {
            errorMsg = {err: false, msg: "The tournament registrations are closed"};
            res.status(400).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script>");
            return;
        }
    } else return;

    // Check if tournament is free entry
    if (!errorMsg) {
        if (tournament.entryFees == 0) {
            tournamentIsFree = true;
        }
    } else return;

    // generate_receipt id
    if(!errorMsg && !done && !tournamentIsFree) {
        let d = new Date();
        let timeInMiliSeconds = d.getTime();
        receipt_id = "rcptid_" + Math.floor(Math.random() * Math.pow(10, 12)) + "-" + timeInMiliSeconds;
    } else if (errorMsg) return;



    // prepare order_id
    if (!errorMsg && !tournamentIsFree) {
        amount = Math.floor(tournament.entryFees * 100);

        let options = {
            amount: amount,
            currency: "INR", // change this to user.accountCurrency
            receipt : receipt_id,
            payment_capture: '0'
        }

        await instance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                errorMsg = {err: true, msg : "Internal Server Error. Please try again later"};
                res.status(500).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script>");
                return;
            } else {
                // order has been created. Provide the required information to the server now.
                orderId = order.id;
            }
        });
    } else if (errorMsg) return;

    // Store the information of the registration to the server and prepare for the user payment page
    if (!errorMsg) {
        let participants = [
            {
                name : player1Name,
                ign : player1Ign
            },
            {
                name : player2Name,
                ign : player2Ign
            },
            {
                name : player3Name,
                ign : player3Ign
            },
            {
                name : player4Name,
                ign : player4Ign
            }
        ], newParticipantsList = [], newRegistrationsList = [];
    
        for (let i = 0 ; i < playerCount ; i++) {
            let newParticipant = {
                name : participants[i].name,
                ign : participants[i].ign
            };
            newParticipantsList.push(newParticipant);
        }
        
        let newObj;
    
        if (!tournamentIsFree) {
            newObj = {
                teamName : teamName || "Team-" + Math.floor(Math.random() * Math.pow(10, 15)),
                emailID : emailID || "",
                contactInfo : contactInfo || "",
                participants : newParticipantsList,
                payment : "notdone",
                slot : 0,
                receiptId : receipt_id,
                razorpay_order_id: orderId,
                razorpay_payment_id : "",
                t : t
            }
        } else {
            newObj = {
                teamName : teamName || "Team-" + Math.floor(Math.random() * Math.pow(10, 15)),
                emailID : emailID || "",
                contactInfo : contactInfo || "",
                participants : newParticipantsList,
                payment : "done",
                slot : 0,
                t : t
            }
        }
        
    
        newRegistrationsList = [...tournament.registrations, newObj];
    
        await Tournament.updateOne({tid : tid}, {registrations : newRegistrationsList}, err=>{
            if (err) {
                console.log (err);
                errorMsg = {err: true, msg : "Internal Server Error! Please try again later."};
                res.status(400).send("<script>alert('" + errorMsg.msg + "'); window.location.replace('" + domainName + "');</script>");
                return;
            }
        });
    } else return;
    
    // Render the payment page to the user
    if (!errorMsg) {
        if (!tournamentIsFree) {
            res.render("paymentpage", {
                domainRoot: domainName,
                keyId: auth.key_id,
                amount: amount,
                currency: "INR",
                orderId: orderId,
                name: teamName,
                email: emailID || "",
                contact : contactInfo || "",
                pageTitle : "Confirm Registration",
                pagePreText : "By proceeding you will be paying ",
                pagePostText : " in order to confirm your registration to the tournament.",
                title : "Madfangs Secure Payment",
                description : "Securely complete your registration process.",
                type: "tournament",
                returnLink : domainName + "tournament/tid/" + tid + "/register/success"
            });
            return;
        } else {
            let name, msg = "";

            playerCount === 1 ? name = player1Ign : name = teamName;

            res.render("successfulregistrationpage", {
                domainRoot : domainName,
                name : name,
                msg : msg
            });
            return;
        }
    } else return;
}

module.exports = prepareTournamentRegistrationPayment;
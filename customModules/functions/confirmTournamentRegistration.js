// This is an asynchronous function that takes the tid of the tournament, the body of the post request and the res object to respond to the user

// sanitize input

// Confirm the signature to be from an authentic source.
// Check type of the transaction

// check if slots are full

// check if amount is right

// check if the orderId exists in the database

// create new registrations list

// successfully complete the registration of the users and display the registration done msg

require('dotenv').config();
const express = require("express");
const CryptoJS = require("crypto-js");

const {Tournament} = require("../db/db.dataModels");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // The response from the server is sent using this

// root domain link
const domainName = process.env.DOMAIN_ROOT;

// get keys from env variables
let auth = {
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
}

async function confirmTournamentRegistration (tid, data, res) {
    let errorMsg, done = false, hash, tournament, orderFound = false, newRegistrationsList = [], playerCount = 0, teamName = "", player1Ign = "";

    // sanitize inputtournament
    if(typeof data !== "object" || !data.hidden || !data.razorpay_payment_id || !data.razorpay_order_id || !data.razorpay_signature) {
        errorMsg = {err: true, msg: "Internal Server Error. Please try again later."};
        res.status(500).json(errorMsg);
        return;
    }
    let orderId = data.razorpay_order_id.toString().trim(),
        paymentId = data.razorpay_payment_id.toString().trim(),
        signature = data.razorpay_signature.toString().trim(),
        type = data.hidden.toString().trim();


    // Confirm the signature to be from an authentic source.
    if (!errorMsg) {
        hash = CryptoJS.HmacSHA256(orderId + "|" + paymentId, auth.key_secret).toString(CryptoJS.enc.Hex);
        if(hash !== signature) {
            errorMsg = {err: true, msg: "Internal Server Error. Source is not authentic."};
            res.status(500).json(errorMsg);
            return;
        }
    } else return;

    // Check type of the transaction
    if (type !== "tournament") {
        errorMsg = {err: false, msg : "Something went wrong! Please try again later."};
        res.status(400).json(errorMsg);
        return;
    }

    // check if slots are full
    if (!errorMsg) {
        await Tournament.findOne({tid : tid}, (err, data)=>{
            if (err) {
                console.log (err);
                errorMsg = {err : true, msg : "Internal Server Error! Please try again later."};
                res.status(500).send(errorMsg.msg);
                return;
            }
            tournament = data;
        });

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
            errorMsg = {err: true, msg: "Uh Oh! Slots full! Please contact +918399012435 and report this incident. Your order id is : " + orderId};
            res.status(400).send(errorMsg.msg);
            return;
        }

    } else return;

    // check if amount is right

    // check if the orderId exists in the database
    if (!errorMsg) {
        // create new registrations list
        let registrations = tournament.registrations;

        registrations.forEach(register=>{
            if (register.payment === "notdone") {
                if (register.razorpay_order_id === orderId) {
                    orderFound = true;

                    register.teamName ? teamName = register.teamName : teamName = "";
                    register.participants.length > 0 ? player1Ign = register.participants[0].ign : player1Ign = "";
                    
                    let newRegister = {...register, payment : "done", razorpay_payment_id : paymentId};
                    newRegistrationsList.push(newRegister);
                }
            } else {
                newRegistrationsList.push(register);
            }
        });

        if (!orderFound) {
            errorMsg = {err: false, msg : "Something went wrong! Either we couldn't find your order or, you have already paid for the registration."};
            res.send(errorMsg.msg);
            return;
        }
    } else return;

    // successfully complete the registration of the users and display the registration done msg
    if (!errorMsg) {
        await Tournament.updateOne({tid : tid}, {registrations : newRegistrationsList}, err=>{
            if (err) {
                console.log(err);
                errorMsg = {err: true, msg : "Internal Server Error! Please try again later."};
                res.status(500).send(errorMsg.msg);
                return;
            }
        });

        done = true;

        let name, msg = "Your order ID is " + orderId + ".";
        if (playerCount === 1)
            name = player1Ign;
        else
            name = teamName;

        res.render("successfulregistrationpage", {
            domainRoot : domainName,
            name : name,
            msg : msg
        });
        return;
    } else return;
}


module.exports = confirmTournamentRegistration;
// create a function that takes the user object (the user who made the payment), the body object of the http request, and the response object of the http request

// check errors

// sanitize input

// Confirm the signature to be from an authentic source.

// save in database

// let the user know that the payment is recieved.

require('dotenv').config();
const express = require("express");
const CryptoJS = require("crypto-js");

const {User} = require("../db/db.dataModels");

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

async function paymentConfirmation (user, body, res) {
    let errorMsg, amount, newAccountBalance, userTransactionsList = [];

    // check for errors

    // sanitize input
    if(typeof body !== "object" || !body.hidden || !body.razorpay_payment_id || !body.razorpay_order_id || !body.razorpay_signature) {
        res.status(500).json({err: true, msg: "Internal Server Error. Please try again later."});
        return;
    }
    let orderId = body.razorpay_order_id.toString().trim(),
        paymentId = body.razorpay_payment_id.toString().trim(),
        signature = body.razorpay_signature.toString().trim(),
        type = body.hidden.toString().trim();

    // Confirm the signature to be from an authentic source.
    let hash = CryptoJS.HmacSHA256(orderId + "|" + paymentId, auth.key_secret).toString(CryptoJS.enc.Hex);
    if(hash !== signature) {
        res.status(500).json({err: true, msg: "Internal Server Error. Source is not authentic."});
        return;
    }

    ///// function to perform before saving transactions to database // used in the next section
    function handleTransactions(type) {
        // check if the order was already registered in the database
        let orderExists = false;

        // create the new transaction
        let newTransaction = {...body, type: type, time: new Date()};
        delete newTransaction.hidden;

        user.transactions.forEach(transaction=>{
            if(transaction.razorpay_order_id === newTransaction.razorpay_order_id) {
                orderExists = true;
                amount = parseInt(transaction.amount);
                userTransactionsList.push({...newTransaction, amount: amount});
            }
            else userTransactionsList.push(transaction);
        });

        // if order doesnt exists, inform the user
        if(!orderExists) {
            res.status(500).json({err: true, msg: "Internal Server Error. Order doesn't exist on the database."});
            return;
        }
        

        // create new account balance
        newAccountBalance = (parseInt(user.accountBalance * 100) + amount) / 100;
    }

    // save in database
    if(type === "wallet") {
        handleTransactions("wallet");
        
        // store transaction in database with type wallet, and add the new amount
        await User.updateOne({_id : user._id}, {transactions : userTransactionsList, accountBalance: newAccountBalance}, err=>{ if (err) { console.log(err); errorMsg="Internal Server Error. Please try again later."; } });
    } else {
        // store in database with type misc // but dont update the accountBalance of the user
        handleTransactions("misc");

        await User.updateOne({_id : user._id}, {transactions : userTransactionsList}, err=>{ if (err) { console.log(err); errorMsg="Internal Server Error. Please try again later."; } });
    }

    // let the user know that the payment is recieved.
    if(!errorMsg)
        res.render("paymentsuccesspage", {domainRoot : domainName});
    else
        res.status(500).json({err: true, msg: errorMsg});
}

// export module

module.exports = paymentConfirmation;
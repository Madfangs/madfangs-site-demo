// create a function that takes in the user object (the user who is going to pay the money), the amount (amount entered by the user, not in smallest currency unit).

// sanitize and round amount and convert to smalles currency units (for INR)

// generate receipt id

// prepare order_id

// store the 'amount' of the order and the 'razorpay_order_id' to the transactions in the database

// after order has been created. Provide the required information to the server now.

require('dotenv').config();
const express = require("express");
const Razorpay = require("razorpay");

const {User} = require("../db/db.dataModels");

const app = express();

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

async function preparePayment (user, amount) {
    let errorMsg, done, amountModified, receipt_id, returnData, orderId;

    // sanitize input
    if(typeof amount === "number") {
        let amountSanitized = parseFloat(amount);

        amountModified = parseInt(amountSanitized * 100); // converted to smallest currency units (for INR)
    } else {
        errorMsg = "Entered amount is not a number";
        returnData = {err: true, msg: errorMsg}
        return returnData;
    }

    // generate receipt id
    if(!errorMsg || !done) {
        let d = new Date();
        let timeInMiliSeconds = d.getTime();
        receipt_id = "rcptid_" + Math.floor(Math.random() * Math.pow(10, 12)) + "-" + timeInMiliSeconds;
    } else return;

    
    // prepare order_id
    if(!errorMsg || !done) {
        let options = {
            amount: amountModified,
            currency: "INR", // change this to user.accountCurrency
            receipt : receipt_id,
            payment_capture: '0'
        }

        await instance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                errorMsg = "Internal Server Error. Please try again later";
                returnData = {err: true, msg: errorMsg};
                return returnData;
            } else {
                // order has been created. Provide the required information to the server now.
                orderId = order.id;

                returnData = {
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    amount: amountModified,
                    currency: user.accountCurrency,
                    orderId: orderId,
                    keyId: auth.key_id // Get this from your environment file
                };
            }
        });

    } else return;

    // store the 'amount' of the order and the 'razorpay_order_id' to the transactions in the database
    if (!errorMsg || !done) {
        let oldTransactions = user.transactions || [], transaction = {
            amount: amountModified,
            razorpay_order_id: orderId
        }, newTransactionsList = [...oldTransactions, transaction];

        // Update in database
        await User.updateOne({_id: user._id}, {transactions: newTransactionsList}, err=>{ if(err) {console.log(err); errorMsg="Internal Server Error! Please try again later."; } });

    } else return;

    if(!errorMsg || !done) {
        return returnData;
    } else {
        return {err: true, msg: "Internal Server Error! Please try again later."};
    }

}

// export modules

module.exports = preparePayment;
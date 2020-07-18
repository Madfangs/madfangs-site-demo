'use strict';

require('dotenv').config();
const express = require("express");
const router = express.Router();

// custom modules
const {findList} = require('../find');
const preparePayment = require("../functions/preparePayment");
const paymentConfirmation = require("../functions/paymentConfirmation");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // The response from the server is sent using this




///////////////////////////// CONFIGURED FOR THE DOMAIN /////////////////////////////
const domainName = process.env.DOMAIN_ROOT;

router.get("/", (req, res)=>{
    findList('nav', navFull=>{
        res.render("walletpage", {domainRoot: domainName, data: JSON.stringify({
                "navigationFull" :  navFull,
                "activeNav": "dashboard",
                "domainName" : domainName,
                "accountBalance": 0,
                "accountCurrency": "INR"
            })
        });
    });
});

router.post("/prepare-payment", (req, res)=>{
    let amount = parseFloat(req.body.amount);
    
    if(amount) {
        preparePayment(req.user, amount)
            .then(data=>{
                if(data.msg) {
                    res.send("<script>alert('An error has occured. Msg : " + data.msg + "'); window.location.replace = '" + domainName + "wallet';</script>");
                    return;
                } else {
                    // send the user the payment page
        
                    res.render("paymentpage", {
                        domainRoot: domainName,
                        keyId: data.keyId,
                        amount: data.amount,
                        currency: data.currency,
                        orderId: data.orderId,
                        name: data.name,
                        email: data.email,
                        contact: "",
                        pageTitle : "Confirm Order",
                        pagePreText : "By proceeding you will be adding ",
                        pagePostText : " to your Madfangs Wallet.",
                        title : "Madfangs Wallet",
                        description : "Add money to your Madfangs wallet",
                        type: "wallet",
                        returnLink : domainName + "wallet/payment/success/"
                    });
                }
            })
            .catch(err=>{if (err) {console.log(err); res.json({err: true, msg: "Internal Server Error! Please try again later."})} });
    }
    else
        res.status(400).json({err: true, msg: "Invalid Request"});
});

router.post("/payment/success", (req, res)=>{
    paymentConfirmation(req.user, req.body, res);
});

// export the router //

module.exports = router;
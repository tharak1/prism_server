// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

const asyncHandeler = require("express-async-handler");
const UserDetails = require("../models/userDetailsModel");

const sendMessage = asyncHandeler(async(req,res)=>{
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const {rollnumbers} = req.body;
let arr = []
for(let i=0;i<rollnumbers.length;i++){
    const user = await UserDetails.findOne({rollno :rollnumbers[i]});  
    await client.messages
    .create({from: '+13604064403', body: `Your Ward ${user.name} of class ${user.clas} is absent today.\n Roll.no : ${user.rollno}`, to: '+917989833031'})
    .then(message => res.send(message));  
}
});

module.exports = {sendMessage};



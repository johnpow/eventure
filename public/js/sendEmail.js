
const dotenv = require('dotenv').config();

const send = require('gmail-send')({
    user: 'eventure.confirm@gmail.com',
    pass: process.env.GMAIL_PASSWORD,

  });

  send({
    to:   'johnowed@gmail.com',
    subject: 'Confirmed for Eventure!',
    text:    'You are now confirmed for the event!',  
  }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
  })
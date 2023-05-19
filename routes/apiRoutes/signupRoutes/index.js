const router = require('express').Router();
const { SignUp, Activity } = require('../../../models');
const withAuth = require('../../../utils/auth');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.RTOKEN
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: "eventure.confirm@gmail.com", 
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       refreshToken:process.env.RTOKEN,
       accessToken: accessToken
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newSignUp = await SignUp.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    

    const activityData = await Activity.findByPk(req.body.activity_id, {

    });


    const activity = activityData.get({ plain: true });

    const mailOptions = {
      from: "eventure.confirm@gmail.com",
      to: req.session.email,
      subject: `You are now signed up for ${activity.activity_title}!`,
      generateTextFromHTML: true,
      html: "Enjoy the event!"
 };

 smtpTransport.sendMail(mailOptions, (error, response) => {
  error ? console.log(error) : console.log(response);
  smtpTransport.close();
});
  

    res.status(200).json(newSignUp);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:activity_id', withAuth, async (req, res) => {
  try {
    const signupData = await SignUp.destroy({
      where: {
        activity_id: req.params.activity_id,
        user_id: req.session.user_id,
      },
    });

    if (!signupData) {
      res.status(404).json({ message: 'No signup found with this id!' });
      return;
    }

    res.status(200).json(signupData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

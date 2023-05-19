const router = require('express').Router();
const { User } = require('../../../models');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const user = userData.get({ plain: true });

    req.session.save(() => {
      req.session.email = user.email;
      req.session.user_id = user.id;
      req.session.logged_in = true;
      req.session.name = user.username;
      req.session.user = user;

      res.status(200).json(userData);
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eventure.confirm@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      }
    });
    
    const mailOptions = {
      from: 'eventure.confirm@gmail.com',
      to: user.email,
      subject: `Welcome ${user.username}! You are now part of Eventure!`,
      text: 'Please explore the site and sign up for some events!', 
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
     console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // do something useful
      }
    });



  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const user = userData.get({ plain: true });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.email = user.email;
      req.session.user_id = user.id;
      req.session.logged_in = true;
      req.session.user = user;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

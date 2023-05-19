const router = require('express').Router();
const { User } = require('../../../models');
const dotenv = require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const user = userData.get({ plain: true });

    const send = require('gmail-send')({
      user: 'eventure.confirm@gmail.com',
      pass: process.env.GMAIL_PASSWORD,
    
    });

        send({
          to:  `${req.body.email}`,
          subject: `Welcome ${req.body.username}! You are now part of Eventure!`,
          text:    'Please explore the site and sign up for some events!',  
        }, (error, result, fullResult) => {
          if (error) console.error(error);
          console.log(result);
        })
    

    req.session.save(() => {
      req.session.email = user.email;
      req.session.user_id = user.id;
      req.session.logged_in = true;
      req.session.name = user.username;
      req.session.user = user;

      res.status(200).json(userData);
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

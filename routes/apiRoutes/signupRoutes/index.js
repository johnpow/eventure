const router = require('express').Router();
const { SignUp, Activity } = require('../../../models');
const withAuth = require('../../../utils/auth');
const dotenv = require('dotenv').config();

router.post('/', withAuth, async (req, res) => {
  try {
    const newSignUp = await SignUp.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    

    const activityData = await Activity.findByPk(req.body.activity_id, {

    });


    const activity = activityData.get({ plain: true });
    // try {
    // const send = require('gmail-send')({
    //   user: 'eventure.confirm@gmail.com',
    //   pass: process.env.GMAIL_PASSWORD,
    
    // });

    //     send({
    //       to:  req.session.email,
    //       subject: `You are now signed up for ${activity.activity_title}!`,
    //       text:    'Enjoy the event!',  
    //     }, (error, result, fullResult) => {
    //       if (error) console.error(error);
    //       console.log(result);
    //     })
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }

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

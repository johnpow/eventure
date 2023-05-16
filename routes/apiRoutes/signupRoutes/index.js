const router = require('express').Router();
const { SignUp } = require('../../../models');
const withAuth = require('../../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newSignUp = await SignUp.create({
      ...req.body,
      user_id: req.session.user_id,
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

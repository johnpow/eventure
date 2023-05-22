const router = require('express').Router();
const { Activity } = require('../../../models');
const withAuth = require('../../../utils/auth');

// The `/api/activity/:id` endpoint (this is for updating an activity with a specific id)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const activityData = await Activity.update(req.body,{
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!activityData) {
      res.status(404).json({ message: 'No activity found with this id!' });
      return;
    }

    res.status(200).json(activityData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const activityRoutes = require('./activityRoutes');
const signupRoutes = require('./signupRoutes');
const userRoutes = require('./userRoutes');
const editEventRoutes = require('./editEventRoutes');

router.use('/users', userRoutes);
router.use('/activity', activityRoutes);
router.use('/signup', signupRoutes);
router.use('/editEvent', editEventRoutes);
module.exports = router;
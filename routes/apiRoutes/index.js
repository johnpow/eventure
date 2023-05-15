const router = require('express').Router();
const activityRoutes = require('./activityRoutes');
const signupRoutes = require('./signupRoutes');
const userRoutes = require('./userRoutes');
const editactRoutes = require('./editactRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', activityRoutes);
router.use('/signup', signupRoutes);
router.use('/editact', editactRoutes);
module.exports = router;
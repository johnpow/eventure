const router = require('express').Router();
const { Activity, User, SignUp } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  if(req.session.logged_in) {
      try {
          const activityData = await Activity.findAll({
              include: [
                  {
                      model: User,
                      attributes: ['username'],              
                  },
                  { model: SignUp, 
                    include: [        {
                                model: User,
                                attributes: ['username'],
                            },],
          
                  },

              ],
          });

          const activities = activityData.map((activity) => {
            const plainActivity = activity.get({ plain: true });
            const username = req.session.user.username || null;
            const isUserSignedUp = plainActivity.signups.some((signup) => signup.user.username === username);
            return {
              ...plainActivity,
              isUserSignedUp: isUserSignedUp
            };
          });
          const categoriesData = await Activity.findAll({
            group: ['activity_category'],
            attributes: ['activity_category'],
        });
        const categories = categoriesData.map((category) => category.get({ plain: true }));
          

          res.render('homepage', {
              activities,
              categories,
              logged_in: req.session.logged_in || false,
              user: req.session.user || null,
          });
      } catch (err) {
          res.status(500).json(err);
      }
  } else { 
      res.render('home');
  }  
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Activity }],
      });
  
      const user = userData.get({ plain: true });
      const categoriesData = await Activity.findAll({
        group: ['activity_category'],
        attributes: ['activity_category'],
      });
      const categories = categoriesData.map((category) => category.get({ plain: true }));
        
      res.render('dashboard', {
        ...user,
        categories,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

router.get('/register', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('register');
});

router.get('/newActivity', withAuth, async (req, res) => {
  try {
      res.render('createActivity', {
          logged_in: req.session.logged_in || false
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/signedUpActivities', withAuth, async (req, res) => {
    try {
        const signUpData = await SignUp.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Activity,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                        {   model: SignUp, 
                            include: [        {
                                        model: User,
                                        attributes: ['username'],
                                    },],
                  
                        },
                    ],        
                },
            ],
        });
        const categoriesData = await Activity.findAll({
            group: ['activity_category'],
            attributes: ['activity_category'],
        });
        const categories = categoriesData.map((category) => category.get({ plain: true }));
        const signedUpActivities = signUpData.map((activity) => activity.get({ plain: true }));
        console.log(signedUpActivities);
        res.render('signedUpActivities', {
            signedUpActivities,
            categories,
            logged_in: req.session.logged_in || false,
            user: req.session.user || null,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:category", async (req, res) => {
    try {
        const activityData = await Activity.findAll({
            where: {
                activity_category: req.params.category,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                { model: SignUp,
                    include: [        {
                                model: User,
                                attributes: ['username'],
                            },],
                },
            ],
        });
        const categoriesData = await Activity.findAll({
            group: ['activity_category'],
            attributes: ['activity_category'],
        });

        const categories = categoriesData.map((category) => category.get({ plain: true }));
        const activities = activityData.map((activity) => activity.get({ plain: true }));
        res.render('activitiesByCategory', {
            activities,
            categories,
            logged_in: req.session.logged_in || false,
            user: req.session.user || null,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;
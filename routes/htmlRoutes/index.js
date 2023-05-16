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
    

            const activities = activityData.map((activity) => activity.get({ plain: true }));
            console.log(req.session.user || null);
            res.render('homepage', {
                activities,
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
        
      res.render('dashboard', {
        ...user,
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



module.exports = router;
const sequelize = require('../config/connection');
const { User, Activity, SignUp } = require('../models');

const userData = require('./userData.json');
const activityData = require('./activityData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  
  for (const activity of activityData) {
    await Activity.create({
      ...activity,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const activities = await Activity.findAll();
  const mappedActivities = activities.map(activity => activity.get({ plain: true }));
  console.log(mappedActivities);


  for (let i = 0; i < 3; i++) {
    await SignUp.create({
      user_id: users[i].id,
      activity_id: mappedActivities[i].id,
    });

  }

  process.exit(0);
};

seedDatabase();

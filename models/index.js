const Activity = require('./Activity');
const User = require('./User');
const SignUp = require('./SignUp');

// create associations

// user has many activities (one to many)
User.hasMany(Activity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Activity.belongsTo(User, {
  foreignKey: 'user_id'
});

// user has many signups (one to many)
User.hasMany(SignUp, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

SignUp.belongsTo(User, {
  foreignKey: 'user_id',
});

// activity has many signups (one to many)
Activity.hasMany(SignUp, {
  foreignKey: 'activity_id',
  onDelete: 'CASCADE',
});

SignUp.belongsTo(Activity, {
  foreignKey: 'activity_id',
});


module.exports = {
  Activity,
  User,
  SignUp
};
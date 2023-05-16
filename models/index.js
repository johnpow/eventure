const Activity = require('./Activity');
const User = require('./User');
const SignUp = require('./SignUp');


User.hasMany(Activity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Activity.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(SignUp, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

SignUp.belongsTo(User, {
  foreignKey: 'user_id',
});

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
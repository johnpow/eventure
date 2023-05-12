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

User.belongsToMany(Activity, {
  through: SignUp,
  as: 'signed_up_activities',
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = {
  Activity,
  User,
  SignUp
};
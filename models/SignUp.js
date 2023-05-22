const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

// Creates the SignUp model and defines the columns for the table 'signup'
class SignUp extends Model {
}


SignUp.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    activity_id: {
        type: DataTypes.UUID,
        references: {
          model: 'activity',
          key: 'id',
        }
      }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'signup',
  }
);

module.exports = SignUp;
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

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
    // timestamps: false,
  }
);

module.exports = SignUp;
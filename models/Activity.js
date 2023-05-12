const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Activity extends Model {
}


Activity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    activity_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    activity_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    activity_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'activity',
    // timestamps: false,
  }
);

module.exports = Activity;
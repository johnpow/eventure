const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

// Creates the User model and defines the columns for the table 'user'
class User extends Model {
  // checks if the password is valid
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}


User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{ isEmail: true}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{len:[8]}
    }
  },
  {    
    hooks: {
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  },
    sequelize,
    freezeTableName: true,
    modelName: 'user',
  }
);

module.exports = User;
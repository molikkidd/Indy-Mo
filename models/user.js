'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
       len: {
        args: [1,99],
        msg: 'Name must be between 1 and 99 characters'
       }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  // before you create the user hash the password
  // and put it in the database
User.addHook('beforeCreate', (pendingUser) => {
  // bcrypt will hash the password
  let hash = bcrypt.hashSync(pendingUser.password, 12); //hashes 12 times
  pendingUser.password = hash; //will go into the DB
});
// then check the password on Sign-In 
// and compare it to the hashed password in the DB
User.prototype.validPassword = function(typedPassword) {
  let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);
  // true/ false boolean
  return isCorrectPassword;
}
// returns an object from the database of the user 
// without the encrypted password
User.prototype.toJSON = function() {
  let userData = this.get();
  delete userData.password;

  return userData;
}
  return User; // add functions above 
};
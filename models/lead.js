'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Lead.belongsTo(models.User, {foreignKey: "userId"});
    }
  };
  Lead.init({
    firstName: {
      type: DataTypes.STRING, 
      validate: {
        len: {
         args: [1,99],
         msg: 'Name must be between 1 and 99 characters'
        }
       }
    },
    lastName: {
    type: DataTypes.STRING, 
    validate: {
      len: {
       args: [1,99],
       msg: 'Name must be between 1 and 99 characters'
      }
     }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10,13],
          msg: 'need to fix the phone number format'
        }
      }
    },
    address: DataTypes.STRING,
    state: {
      type: DataTypes.STRING, 
      validate: {
        len: {
         args: [2,4],
         msg: '2 letters'
        }
       }
    },
    zipCode: {
      type: DataTypes.INTEGER, 
      validate: {
        len: {
         args: [5,9],
         msg: 'Name must be between 5 - 9 numbers'
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
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lead',
  });
  return Lead;
};
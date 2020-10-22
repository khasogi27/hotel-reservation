'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    fullname(){
      return `${this.first_name} ${this.last_name}`
    }
    static associate(models) {
      // define association here
      User.belongsToMany(models.Room, { through: models.Booking })
      User.hasMany(models.Booking)
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(data){
        if(!data.last_name){
          data.last_name = data.first_name
        }
        const hash = bcrypt.hashSync(data.password, 12);
        data.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};

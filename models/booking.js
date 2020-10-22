'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User)
      Booking.belongsTo(models.Room)
    }
  };
  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.STRING,
    qrkey: DataTypes.STRING,
    RoomId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
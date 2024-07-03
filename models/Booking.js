const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const User = require('./User');
const Train = require('./Train');

const Booking = db.define('Booking', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  trainId: {
    type: DataTypes.INTEGER,
    references: {
      model: Train,
      key: 'id'
    }
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Booking, { foreignKey: 'userId' });
Train.hasMany(Booking, { foreignKey: 'trainId' });

module.exports = Booking;

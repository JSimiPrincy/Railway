const Booking = require('../models/Booking');
const Train = require('../models/Train');
const { Sequelize } = require('sequelize');
const db = require('../config/dbConfig');

exports.bookSeat = async (req, res) => {
  const { userId } = req.user;
  const { trainId, seatNumber } = req.body;
  const transaction = await db.transaction();

  try {
    const train = await Train.findOne({ where: { id: trainId }, lock: true, transaction });
    if (train.availableSeats > 0) {
      const booking = await Booking.create({ userId, trainId, seatNumber }, { transaction });
      await train.update({ availableSeats: train.availableSeats - 1 }, { transaction });
      await transaction.commit();
      res.status(201).json({ message: 'Seat booked successfully', booking });
    } else {
      await transaction.rollback();
      res.status(400).json({ message: 'No available seats' });
    }
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findOne({ where: { id: bookingId }, include: [Train] });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

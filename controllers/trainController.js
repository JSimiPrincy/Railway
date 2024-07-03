const Train = require('../models/Train');

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
    const train = await Train.create({ name, source, destination, totalSeats, availableSeats: totalSeats });
    res.status(201).json({ message: 'Train added successfully', train });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSeatAvailability = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const trains = await Train.findAll({ where: { source, destination } });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

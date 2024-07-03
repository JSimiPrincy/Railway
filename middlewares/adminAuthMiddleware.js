const { adminApiKey } = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey && apiKey === adminApiKey) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

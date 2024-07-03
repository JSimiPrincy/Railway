const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const db = require('./config/dbConfig');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', trainRoutes);
app.use('/api', bookingRoutes);

db.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error syncing database: ', err);
});

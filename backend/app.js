const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const { limiter } = require('./middleware/limiter');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const { MONGODB_URI = 'mongodb+srv://maty1981:eytan135@cluster0.gtfinjo.mongodb.net/b' } = process.env;

mongoose.connect(MONGODB_URI);

const { requestLogger, errorLogger } = require('./middleware/logger');

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

// Add user authentication middleware here
app.use('/users', require('./middleware/auth'));

// Routes
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(router);

// Error handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

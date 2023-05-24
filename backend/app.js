require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// const { requestLogger, errorLogger } = require('./middleware/logger');

const { apiLimiter } = require('./utils/rateLimit');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(apiLimiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

 app.get('/crash-test', () => {
   setTimeout(() => {
     throw new Error('Server will crash now');
   }, 0);
 });

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(
    'mongodb+srv://shamoon1997:mongodbatlas123@mongopracticestart.vdf7o.mongodb.net/bnbtest?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('MongoDB cnnected');
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(PORT, () => {
//   console.log(`App listening at port ${PORT}`);
// });

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./src/error/ErrorHandler');

/* --------------------------------- express ------------------------------------- */

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* --------------------------------- mongoose ------------------------------------ */

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Error connecting to database: ', error));

/* ------------------------------------ api - -------------------------------------- */

require('./src/api/UserRouter')(app);
require('./src/api/CategoryRouter')(app);
require('./src/api/PostRouter')(app);
require('./src/api/CommentRouter')(app);

/* ---------------------------------- error handling middleware ------------------------------------- */

app.use(errorHandler);

/* ---------------------------------- server ------------------------------------- */
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started: http://localhost:${process.env.PORT || 3000}/`);
});
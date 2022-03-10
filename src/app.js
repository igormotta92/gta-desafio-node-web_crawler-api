const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const authMiddleware = require('#src/shared/middlewares/authMiddleware');
const dbConnection = require('#src/infra/database/dbConnection');

const ExtractController = require('#src/extract/controllers/extractController');
const ExtractModel = require('#src/extract/models/extractModel');

const app = express();
app.use(cors())
app.use(morgan('common'));
app.use(express.json());

app.get('/health', (_, res) => {
  console.log('aqui');
  res.send();
});

/**
 * USER
 */
app.get('/login', (_, res) => {
  const name = 'ricardo';

  const { JWT_SECRET, JWT_EXPIRES_IN_MINUTES } = process.env;

  const token = jwt.sign({
    sub: 1,
    nameOfUser: name,
  }, JWT_SECRET, { expiresIn: `${JWT_EXPIRES_IN_MINUTES}m` });

  res.json({
    token,
  });

});

/**
 * EXTRAÇÃO
 */
app.use(authMiddleware);

const extractModel = new ExtractModel(dbConnection);
const extractController = new ExtractController(extractModel);
app.use('/extract', extractController.buildRouter());

module.exports = app;




/*
const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./infra/database/dbConnection');
const MoviesController = require('./movies/controllers/moviesController');
const CategoriesModel = require('./movies/models/categoriesModel');
const MoviesModel = require('./movies/models/moviesModel');
const UsersController = require('./users/controllers/usersController');
const UsersModel = require('./users/models/usersModel');

const app = express();
app.use(morgan('common'));
app.use(express.json());

app.get('/health', (_, res) => {
  res.send();
});

const usersModel = new UsersModel(dbConnection);
const usersController = new UsersController(usersModel);
app.use('/users', usersController.buildRouter());

const categoriesModel = new CategoriesModel(dbConnection);
const moviesModel = new MoviesModel(dbConnection);
const moviesController = new MoviesController(moviesModel, categoriesModel);
app.use('/movies', moviesController.buildRouter());

module.exports = app;
*/

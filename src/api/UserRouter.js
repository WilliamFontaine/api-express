const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

module.exports = (app) => {
  router.get('/', UserController.index);
  router.get('/:id', UserController.show);
  router.post('/', UserController.store);
  router.put('/:id', UserController.update);
  router.delete('/:id', UserController.delete);

  app.use('/api/users', router);
}

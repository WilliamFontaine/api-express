const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

module.exports = (app) => {
  router.get('/', CategoryController.index);
  router.get('/:id', CategoryController.show);
  router.post('/', CategoryController.store);
  router.put('/:id', CategoryController.update);
  router.delete('/:id', CategoryController.delete);

  app.use('/api/categories', router);
}

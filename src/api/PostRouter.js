const express = require('express');
const PostController = require('../controllers/PostController');
const router = express.Router();

module.exports = (app) => {
  router.get('/price-sum', PostController.priceSum);
  router.get('/price-average', PostController.priceAverage);
  
  router.get('/', PostController.index);
  router.get('/:id', PostController.show);
  router.post('/', PostController.store);
  router.put('/:id', PostController.update);
  router.delete('/:id', PostController.delete);

  app.use('/api/posts', router);
}

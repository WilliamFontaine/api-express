const express = require('express');
const CommentController = require('../controllers/CommentController');
const router = express.Router();

module.exports = (app) => {
  router.get('/', CommentController.index);
  router.get('/:id', CommentController.show);
  router.post('/', CommentController.store);
  router.put('/:id', CommentController.update);
  router.delete('/:id', CommentController.delete);

  app.use('/api/comments', router);
}

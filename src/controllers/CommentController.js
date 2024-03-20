const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');

class CommentController {
  async index(req, res, next) {
    try {
      const comments = await Comment.find().populate('user_id post_id');
      res.status(StatusCodes.OK).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id).populate('user_id post_id');
      if (!comment) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
      }
      res.status(StatusCodes.OK).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const { content, user_id, post_id } = req.body;
      const comment = await Comment.create({ content, user_id, post_id });
      res.status(StatusCodes.CREATED).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
      if (!comment) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
      }
      res.status(StatusCodes.OK).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByIdAndDelete(id);
      if (!comment) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
      }
      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();

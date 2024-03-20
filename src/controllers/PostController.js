const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { StatusCodes } = require('http-status-codes');

class PostController {
  async index(req, res, next) {
    try {
      const posts = await Post.find().populate('user_id category_ids');
      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate('user_id category_ids');
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' });
      }
      const comments = await Comment.find({ post_id: post._id });
      post.comments = comments;

      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const { title, content, price, user_id, category_ids } = req.body;
      const post = await Post.create({ title, content, price, user_id, category_ids });
      res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, price } = req.body;
      const post = await Post.findByIdAndUpdate(id, { title, content, price }, { new: true });
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' });
      }
      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' });
      }
      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }

  async priceSum(req, res, next) {
    try {
      const posts = await Post.find();
      const priceSum = posts.reduce((acc, post) => acc + post.price, 0);
      res.status(StatusCodes.OK).json({ priceSum });
    } catch (error) {
      next(error);
    }
  }

  async priceAverage(req, res, next) {
    try {
      const posts = await Post.find();
      const priceSum = posts.reduce((acc, post) => acc + post.price, 0);
      const priceAverage = priceSum / posts.length;
      res.status(StatusCodes.OK).json({ priceAverage });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();

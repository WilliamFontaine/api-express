const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

class UserController {
  async index(req, res, next) {
    try {
      const users = await User.find();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const { first_name, last_name } = req.body;
      const user = await User.create({ first_name, last_name });
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { first_name, last_name } = req.body;
      const user = await User.findByIdAndUpdate(id, { first_name, last_name }, { new: true });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

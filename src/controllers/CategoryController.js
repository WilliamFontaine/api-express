const Category = require('../models/Category');
const { StatusCodes } = require('http-status-codes');

class CategoryController {
  async index(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Category not found' });
      }
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({ name, description });
      res.status(StatusCodes.CREATED).json(category);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Category not found' });
      }
      res.status(StatusCodes.OK).json(category);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Category not found' });
      }
      res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();

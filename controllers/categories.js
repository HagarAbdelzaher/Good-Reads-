/* eslint-disable no-throw-literal */

const asyncFunction = require('../middlewares/async');
const { Category } = require('../models/categories');



const addNewCategory = asyncFunction(async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  category.save().then(() => {
    res.status(200).send(category);
  });
});

const getAllCategories = asyncFunction(async (req, res) => {
  if(!req.query.skipPagination){
  const pageSize = 10;
  let page = req.query.page || 1;
  let skip = (page - 1) * pageSize; // currentPage = 4 ---> (4 - 1) * 8 then will count from number 25
  const totalBooks = await Category.countDocuments();
  const totalPages = Math.ceil(totalBooks / pageSize);
  if (page > totalPages) {
    // page = 1;
    throw { status: 404, message: 'There are no books on this page' };
  }
  const categories = await Category.find().skip(skip).sort({ createdAt: -1 }).limit(pageSize);
  res.status(200).send({ page: page, categories: categories, totalPages: totalPages , totalBooks: totalBooks});
  }else{
    const allCategories = await Category.find();
    res.status(200).send(allCategories);
  }
});

const getCategoryById = asyncFunction(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw { status: 404, message: 'Category not found!' };
  }
  res.status(200).send(category);
});

const deleteCategory = asyncFunction(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if(category.numberOfBooks!==0)
  {
    throw { status:409 , message:"You cannot delete a category that contain books"};
  }
  if (!category) {
    throw { status: 404, message: 'Category not found!' };
  }
  const category2 = await Category.findByIdAndRemove(req.params.id);
  res.status(200).send(category2);
});

const updateCategory = asyncFunction(async (req, res) => {
  // eslint-disable-next-line max-len
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
  if (!category) {
    throw { status: 404, message: 'Category not found!' };
  }
  res.status(200).send(category);
});

const getPopularListOfCategories = asyncFunction(async (req, res) => {
  const category = await Category.find().sort({ 'numberOfBooks': -1 }).limit(4);
  if(!category){
    throw { status: 404, message: 'Not found any Category!' };
  }
  res.status(200).send(category);
});


module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getPopularListOfCategories,
};

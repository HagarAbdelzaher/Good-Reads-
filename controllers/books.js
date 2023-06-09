/* eslint-disable no-throw-literal */
const asyncFunction = require('../middlewares/async');
const { Book } = require('../models/books');
const { Category } = require('../models/categories');
const { createUrlPhoto } = require('../middlewares/fileParser');


//////////////////////////////////////////// add Books //////////////////////////////////

const addNewBook = asyncFunction(async (req, res) => {
  if(!req.file) throw{status: 400, message: "no image uploaded"};
  const photo = await createUrlPhoto(`${req.file.destination}/${req.file.filename}`)
  const book = new Book({
    name: req.body.name,
    categoryId: req.body.categoryId,
    authorId: req.body.authorId,
    cover: photo,
    description: req.body.description,
  });
  const category = await Category.findByIdAndUpdate(req.body.categoryId, { $inc: { numberOfBooks: 1 } }, { returnOriginal: false });
  await category.save();
  await book.save();
  await book.populate([
    { path: 'authorId', select: ' _id firstName lastName' },
    { path: 'categoryId', select: '_id name' }
  ]); 
  console.log(book);
  res.status(200).send(book);
});

//////////////////////////////////////////// get search Books //////////////////////////////////

const searchBooks = asyncFunction(async (req,res)=>{
  const books = await Book.find({name: { $regex: new RegExp(req.params.query , 'i') } });
  res.status(200).send(books);
});

//////////////////////////////////////////// get all Books //////////////////////////////////

const getAllBooks = asyncFunction(async (req, res) => {
  if(!req.query.skipPagination){
  const pageSize = 10;
  let page = req.query.page || 1;
  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / pageSize);
  if (page > totalPages) {
    page = 1;
    // throw { status: 404, message: 'There are no books on this page' };
  }
  const skip = (page - 1) * pageSize; // currentPage = 4 ---> (4 - 1) * 8 then will count from number 25
  const books = await Book.find()
  .populate([
    { path: 'authorId', select: ' _id firstName lastName' },
    { path: 'categoryId', select: '_id name' }
  ])
  .skip(skip).sort({ createdAt: -1 }).limit(pageSize);
  res.status(200).send({ page: page, data: books, totalPages: totalPages, totalBooks: totalBooks });
  }else{
    const allBooks = await Book.find()
    res.status(200).send({books: allBooks});
  }
});

//////////////////////////////////////////// get Book by id //////////////////////////////////

const getBookById = asyncFunction(async (req, res) => {
  const book = await Book.findById(req.params.id).populate([
    { path: 'authorId', select: ' _id firstName lastName' },
    { path: 'categoryId', select: '_id name' }
  ]);
  if (!book) {
    throw { status: 404, message: 'Book not found!' };
  }
  res.status(200).send(book);
});

//////////////////////////////////////////// get Book by category //////////////////////////////////

const getBooksByCategory = asyncFunction(async (req, res) => {
  const category = await Category.findById(req.params.categoryId);
  if (!category) {
    throw { status: 404, message: 'category not found!' };
  }
  const pageSize = 10;
  let page = req.query.page || 1;
  const totalBooks = await Book.find({ categoryId: req.params.categoryId }).countDocuments();
  const totalPages = Math.ceil(totalBooks / pageSize);
  if (page > totalPages) {
    page = 1;
  }
  const skip = (page - 1) * pageSize;
  const books = await Book.find({ categoryId: req.params.categoryId }).skip(skip).limit(pageSize);
  if (!books) {
    throw { status: 404, message: 'There are no books on this category' };
  }
  res.status(200).send({ page, data: books, totalPages , totalBooks});
});

//////////////////////////////////////////// delete Books //////////////////////////////////

const deleteBook = asyncFunction(async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) {
    throw { status: 404, message: 'Book not found!' };
  }
  // eslint-disable-next-line max-len
  const category = await Category.findByIdAndUpdate(book.categoryId, { $inc: { numberOfBooks: -1 } }, { returnOriginal: false });
  category.save();
  res.status(200).send(book);
});

//////////////////////////////////////////// update Book //////////////////////////////////

const updateBook = asyncFunction(async (req, res) => {
  // eslint-disable-next-line max-len
  if (req.file) {
    req.body.cover = await createUrlPhoto(`${req.file.destination}/${req.file.filename}`)
  }
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
  if (!book) {
    throw { status: 404, message: 'Book not found!' };
  }res.status(200).send(book);
});

/////////////////////////////////////////// get Popular Books //////////////////////////////////

const getPopularListOfBooks = asyncFunction(async (req, res) => {
  const books = await Book.find().populate([
    { path: 'authorId', select: ' _id firstName lastName' },
    { path: 'categoryId', select: '_id name' }
  ]).sort({ popularity: -1 }).limit(6);
  if (!books) {
    throw { status: 404, message: 'No books found!' };
  }
  res.status(200).json(books);
});

module.exports = {
  addNewBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  getBooksByCategory,
  getPopularListOfBooks,
  searchBooks,
};


// const getBook = await Book.findById(req.params.id);
// if (!getBook) {
//   throw { status: 404, message: 'Book not found!' };
// }
// deleteUrlPhoto(getBook.cover.split("/").pop().split('.')[0]);

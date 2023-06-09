/* eslint-disable no-throw-literal */
const { Author } = require('../models/authors');
const { Book } = require('../models/books');
const asyncFunction = require('../middlewares/async');
const { createUrlPhoto, deleteUrlPhoto } = require('../middlewares/fileParser');


///////////////////////////////////// get authors ////////////////////////////////////////

const getAuthors = asyncFunction(async (req, res) => {
  if(!req.query.skipPagination){
  const pageSize = 10;
  let page = req.query.page || 1;
  let skip = (page - 1) * pageSize;
  const totalAuthors = await Author.countDocuments();
  const totalPages = Math.ceil(totalAuthors / pageSize);
  if (page > totalPages) {
    throw { status: 404, message: 'There are no books on this page' };
  }
  const authors = await Author.find().skip(skip).sort({ createdAt: -1 }).limit(pageSize);
  res.status(200).send({ page: page, authors: authors, totalPages: totalPages , totalAuthors: totalAuthors});
  }else{
    const allAuthors = await Author.find();
    res.status(200).send(allAuthors);
  } 
});

//////////////////////////////////// get author //////////////////////////////////////////

const getAuthorById = asyncFunction(async (req, res) => {
  const { authorId } = req.params;
  const oneAuthor = await Author.findById({ _id: authorId });
  if (!oneAuthor) {
    throw { status: 404, message: 'Author not found!' };
  }
  res.status(200).send(oneAuthor);
});

//////////////////////////////////// create author ///////////////////////////////////////

const createNewAuthor = asyncFunction(async (req, res) => {
  if(req.body.dob){
    req.body.dob = Date.parse(req.body.dob)
  }
  if(!req.file) throw{status: 400, message: "no image uploaded"};
  const photo = await createUrlPhoto(`${req.file.destination}/${req.file.filename}`)
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    photo: photo,
    bio: req.body.bio,
  });
  author.save().then(() => { res.status(200).send(author); });
});

//////////////////////////////////// delete author ///////////////////////////////////////

const deleteAuthorById = asyncFunction(async (req, res) => {
  const author = await Author.findById({ _id: req.params.authorId });
  if (!author) {
    throw { status: 404, message: 'Author not found!' };
  }
  const authorBooks = await Book.find({ authorId: req.params.authorId })

  if(authorBooks.length!==0)
  {
    throw{status:409 , message :"You cannot delete an author without deleting his books first!"}
  }
  deleteUrlPhoto(author.photo.split("/").pop().split('.')[0]);
  const author2 = await Author.findByIdAndDelete({ _id: req.params.authorId });
  res.status(200).send(author2);
 
});

//////////////////////////////////// update author ///////////////////////////////////////

const updateAuthorById = asyncFunction(async (req, res) => {
  const getAuthor = await Author.findById({ _id: req.params.authorId });
  if(!getAuthor){
    throw { status: 404, message: 'Author not found!' };
  }
  if(req.file){
    req.body.photo= await createUrlPhoto(`${req.file.destination}/${req.file.filename}`)
  } 
  if(req.body.dob){
    req.body.dob = Date.parse(req.body.dob)
  }
  deleteUrlPhoto(getAuthor.photo.split("/").pop().split('.')[0]);
  const author = await Author.findByIdAndUpdate({ _id: req.params.authorId },req.body, { returnOriginal: false});
  if (!author) {
    throw { status: 404, message: "can't delete this author!" };
  }
  res.status(200).send(author);
});

////////////////////////////////// get popular list ///////////////////////////////////////////

const getPopularListOfAuthors = asyncFunction(async (req, res) => {
  const highRatingsOfBooks = await Book.find().populate({
    path: 'authorId',
  }).sort({ popularity: -1 });

  if (!highRatingsOfBooks || highRatingsOfBooks.length === 0) {
    throw { status: 404, message: 'No books exist' };
  }

  const popularAuthorSet = new Set();
  for (let i = 0; i < highRatingsOfBooks.length && popularAuthorSet.size < 3; i++) {
    popularAuthorSet.add(highRatingsOfBooks[i].authorId);
  }
  const popularAuthor = [...popularAuthorSet];
  if (popularAuthor.length === 0) {
    throw { status: 404, message: 'No authors exist' };
  }
  res.status(200).send(popularAuthor);
});

////////////////////////////////// get Books by Author ///////////////////////////////////////////

const getBooksByAuthor = asyncFunction(async (req, res) => {
  const author = await Author.findById(req.params.authorId);
  if (!author) {
    throw { status: 404, message: 'Author not found!' };
  }
  const pageSize = 8;
  let page = req.query.page || 1;
  const totalBooks = await Book.find({ authorId: req.params.authorId }).countDocuments();
  const totalPages = Math.ceil(totalBooks / pageSize);
  if (page > totalPages) {
    page = 1;
  }
  const skip = (page - 1) * pageSize;
  const books = await Book.find({ authorId: req.params.authorId }).skip(skip).limit(pageSize);
  if (!books) {
    throw { status: 404, message: 'There are no books for this author' };
  }
  res.status(200).send({ page, data: books, totalPages });
});

module.exports = {
  createNewAuthor,
  getAuthors,
  getAuthorById,
  deleteAuthorById,
  updateAuthorById,
  getPopularListOfAuthors,
  getBooksByAuthor,
};

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: 'Author',
      required:true
    },
    cover: {
      type: String,
      required: true,
    },
    numberOfRatings: {
      type: Number,
      default: 1,
    },
    sumOfRatings: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    Interactions: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: 'users',
        },
        review: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
bookSchema.methods.calculatePopularity = function() {
  this.popularity = (this.sumOfRatings / this.numberOfRatings) * this.Interactions;
  return this.save();
};
bookSchema.virtual('averageRating').get(function () {
  this.calculatePopularity();
  return this.sumOfRatings / this.numberOfRatings;
});

const Book = mongoose.model('Book', bookSchema);

module.exports = {
  Book,
};

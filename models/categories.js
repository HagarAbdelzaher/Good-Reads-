const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  numberOfBooks: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category,
};

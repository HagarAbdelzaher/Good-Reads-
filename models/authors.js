const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      optional: true,
    },
    bio: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = {
  Author,
};

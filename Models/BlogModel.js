const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  state: {
    type: String,
  },
  read_count: {
    type: Number,
  },
  reading_time: {
    type: Number,
  },
  tags: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Blog = model('Blog', blogSchema);

module.exports = { Blog };

const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
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
      default: 'draft',
      enum: ['draft', 'published'],
    },
    readCount: {
      type: Number,
    },
    readingTime: {
      type: Number,
    },
    tags: {
      type: Array,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model('Blog', blogSchema);

module.exports = { Blog };

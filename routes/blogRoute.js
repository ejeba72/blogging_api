const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');

const route = Router();

route.get('/', async (req, res) => {
  // try {} catch () {}

  try {
    const blog = await Blog.find();
    // res.send({
    //   title: blog.title,
    //   author: blog.author,
    // });

    // console.log({
    //   title: blog.title,
    //   author: blog.author,
    // });

    res.status(200).send(blog);
    console.log(`\n***BLOG GET REQUEST***`);
    console.log(blog);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

route.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      author,
      state,
      read_count,
      reading_time,
      tags,
      body,
      timestamp,
    } = req.body;

    const newBlog = new Blog({
      title,
      description,
      author,
      state,
      read_count,
      reading_time,
      tags,
      body,
      timestamp,
    });

    savedBlog = await newBlog.save();

    res.status(201).send({
      status: 'Your blog post has been created successfully',
      Blog: savedBlog,
    });

    console.log(`\n***BLOG POST REQUEST***`);
    console.log({
      status: 'Your blog post has been created successfully',
      Blog: savedBlog,
    });
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = { route };

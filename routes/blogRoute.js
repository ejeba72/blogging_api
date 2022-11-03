/* 
For the Get route, that show a list of articles, I initially tried the following approach:
  const blog = await Blog.find();

  const [{ title, author }] = blog;

  const blogList = {
    title,
    author,
  };

But I got the title and author of only the first blog. That was when I had to research on array methods in order to ascertain how I could achieve my goal of creating a blog list. And I eventually settled with the map() method.
*/

const { parse } = require('dotenv');
const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');

const route = Router();

// Get Blog List
route.get('/', async (req, res) => {
  // try {} catch () {}

  try {
    const blog = await Blog.find();

    const blogList = blog.map(article => {
      return {
        title: article.title,
        author: article.author,
      };
    });

    res.status(200).send(blogList);

    console.log(`\n***BLOG GET REQUEST***`);
    console.log(blogList);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// Get Blog (i.e. a single article)
// Authentication: Only for logged in users
route.get('/:id', async (req, res) => {
  // try {} catch () {}

  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    res.status(200).send(blog);

    console.log(`\n***BLOG GET REQUEST***`);
    console.log(blog);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// Post Blog
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

// update
route.patch('/:id', async (req, res) => {
  // try{}catch(){}

  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    res.status(200).send(blog);

    console.log(`\n***BLOG UPDATE REQUEST***`);
    console.log(`Update route`);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// This Get route is for development purpose only
route.get('/all_blogs', async (req, res) => {
  const allBlogs = await Blog.find();

  res.status(200).send(allBlogs);

  console.log(allBlogs);
});

module.exports = { route };

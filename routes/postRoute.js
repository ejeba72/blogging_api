const { Router } = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { Blog } = require('../Models/BlogModel');

const route = Router();

// route.use(verifyToken());

// Get all blog post by the author
route.get('/', verifyToken, async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).send(allBlogs);

    console.log(`\n***EDIT ROUTE GET-ALL REQUEST***`);
    console.log(allBlogs);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// Post Blog
route.post('/', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);

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

module.exports = { route };

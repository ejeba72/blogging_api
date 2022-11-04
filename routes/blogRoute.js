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

const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');

const route = Router();

// Get Blog List
route.get('/blog_list', async (req, res) => {
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
route.get('/blog/:id', async (req, res) => {
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

module.exports = { route };

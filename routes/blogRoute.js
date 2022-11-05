/* 
 GET PUBLISHED BLOG LIST:
For the route, that show a list of articles, I initially tried the following approach:
  const blog = await Blog.find();

  const [{ title, author }] = blog;

  const blogList = {
    title,
    author,
  };

But I got the title and author of only the first blog. That was when I had to research on array methods in order to ascertain how I could achieve my goal of creating a blog list. And I eventually settled with the map() method.
*/

/* 
GET PUBLISHED BLOG POST:

The code snippet below was my initial attempt for the blog post route.

  const { id } = req.params;

  const blogs = await Blog.find({ state: 'published' });

  const blogPost = blogs.find(blog => {
    return blog._id === id;
  });

  res.send(blogPost);
  console.log(blogPost);


But it gave me some troubles. Resultantly, I eventually settled approach that worked.
*/

const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');

const route = Router();

// GET PUBLISHED BLOG LIST
route.get('/', async (req, res) => {
  try {
    const { p = 1, lim = 20 } = req.query; // Pagination is defaulted to 20 blogs per page.
    const blog = await Blog.find({ state: 'published' })
      .limit(lim)
      .skip((p - 1) * lim);

    const blogList = blog.map(article => {
      return {
        title: article.title,
        author: article.author,
      };
    });

    res.status(200).send(blogList);
    console.log(blogList);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// GET PUBLISHED BLOG POST
route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (blog.state === 'draft') {
      return res.status(403).send(`403 Forbidden`);
    }

    const blogPost = {
      title: blog.title,
      author: blog.author,
      readCount: blog.readCount,
      body: blog.body,
    };

    console.log(blogPost);
    res.send(blogPost);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

module.exports = { route };

/* 
PURPOSE OF THE POST ROUTE
This route is written to enable a user (ie author) to be able to perform CRUD operations on only the posts that belong to him.
 */

const { Router } = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { Blog } = require('../Models/BlogModel');

const route = Router();

route.use('/', verifyToken);

// GET ALL BLOG POSTS
route.get('/', async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).send(allBlogs);
    console.log(allBlogs);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// GET LIST OF BLOG POSTS
route.get('/post_list', async (req, res) => {
  try {
    const { p = 1, lim = 20 } = req.query; // Pagination is defaulted to 20 blogs per page.
    const blog = await Blog.find()
      .limit(lim)
      .skip((p - 1) * lim);

    const blogList = blog.map(article => {
      return {
        title: article.title,
        state: article.state,
      };
    });

    res.status(200).send(blogList);
    console.log(blogList);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// CREATE BLOG POST
route.post('/', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);

    savedBlog = await newBlog.save();

    const successMsg = {
      status: 'Your blog post has been created successfully',
      Blog: savedBlog,
    };

    res.status(201).send(successMsg);

    console.log(successMsg);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

// UPDATE BLOG POST
route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, state, tags, body } = req.body;

    // let blog = await Blog.findById(id);
    const blog = await Blog.findById(id);

    const { dbTitle, dbDescription, dbState, dbTags, dbBody } = blog;

    if (!blog) {
      return res.status(404).send(`404 Not Found`);
    }

    // blog = req.body;

    blog.title = title || dbTitle;
    blog.description = description || dbDescription;
    blog.state = state || dbState;
    blog.tags = tags || dbTags;
    blog.body = body || dbBody;

    await blog.save();

    res.status(200).send(blog);
    console.log(blog);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// DELETE BLOG POST
route.delete('/', async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.deleteOne({ _id: id });

    return res.status(200).send(`Your blog was deleted successfully`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = { route };

/* 
{
  "tags": [],
  "_id": "6363876a1eff2246bdcc235e",
  "title": "my fifth post",
  "description": "my fifth desc",
  "author": "Kelvin Umukoro",
  "state": "published",
  "body": "Hello readers, This is my fifth blog post",
  "timestamp": "2022-11-03T09:18:34.776Z",
  "__v": 0
}
*/

/* 
 {
    "_id": "636677e8183b50f59c89f454",
    "title": "The seventh post",
    "description": "An exciting article",
    "author": "Joshua Olusanya",
    "state": "published",
    "tags": [],
    "body": "Hello readers, This is a very awesome blog post",
    "createdAt": "2022-11-05T14:49:12.777Z",
    "updatedAt": "2022-11-05T14:49:12.777Z",
    "__v": 0
  }
*/

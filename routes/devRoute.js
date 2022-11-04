/* 
PLEASE NOTE: This route is for development purpose only.
*/

const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');

const route = Router();

// Get-all route
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

// For testing purpose only (That is, I needed this piece of code during development)
route.get('/', async (req, res) => {
  // try {} catch () {}
  try {
    const allUsers = await User.find();

    const userdb = {
      documentNo: allUsers.length,
      documentList: allUsers,
    };

    res.status(200).send(userdb);
    console.log(`\n***BLOG GET REQUEST***`);
    console.log(userdb);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

module.exports = { route };

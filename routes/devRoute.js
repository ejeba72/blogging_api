// ATTENTION: THIS FILE EXIST FOR DEVELOPMENT PURPOSE ONLY!  ;)

const { Router } = require('express');
const { Blog } = require('../Models/BlogModel');
const { User } = require('../Models/UserModel');

const route = Router();

route.get('/all_users/', async (req, res) => {
  try {
    const allUsers = await User.find();

    console.log(allUsers);
    res.send(allUsers);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

route.get('/all_blogs/', async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    console.log(allBlogs);
    res.send(allBlogs);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = { route };

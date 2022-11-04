// This file exist just for development purpose only.

const { Router } = require('express');
const { User } = require('../Models/UserModel');

const route = Router();

route.get('/all_users/', async (req, res) => {
  const allUsers = await User.find();

  console.log(allUsers);
  res.send(allUsers);
});

module.exports = { route };

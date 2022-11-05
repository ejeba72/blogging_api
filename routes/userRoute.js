const { Router } = require('express');
const {
  signupLogic,
  loginLogic,
  logoutLogic,
} = require('../controllers/userController');

const route = Router();

// SIGN UP ROUTE
route.post('/signup', signupLogic);
route.post('/login', loginLogic);
route.get('/logout', logoutLogic);

module.exports = { route };

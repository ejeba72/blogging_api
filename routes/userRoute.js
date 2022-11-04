const { Router } = require('express');
const { signupLogic, loginLogic } = require('../controllers/userController');

const route = Router();

// SIGN UP ROUTE
route.post('/signup', signupLogic);
route.post('/login', loginLogic);

module.exports = { route };

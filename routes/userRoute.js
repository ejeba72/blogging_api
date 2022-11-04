const { Router } = require('express');
const { signupLogic } = require('../controllers/userController');

const route = Router();

// SIGN UP ROUTE
route.post('/signup', signupLogic);

module.exports = { route };

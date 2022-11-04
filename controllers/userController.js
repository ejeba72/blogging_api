const { config } = require('dotenv');
const { sign } = require('jsonwebtoken');
const { User } = require('../Models/UserModel');

const expiration = 60 * 60;
const JWT_SECRET = process.env.JWT_SECRET;

// DOTENV CONFIG
config();

// JSON WEB TOKEN
function createToken(id) {
  return sign({ id }, JWT_SECRET, {
    expiresIn: expiration,
  });
}

// SIGN UP LOGIC
async function signupLogic(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await newUser.save();

    // const token = createToken(savedUser._id);
    // res.cookie('jwt', token, { maxAge: expiration * 1000, httpOnly: true });

    res.status(201).send(`Hurray! Your sign up is successful!`);
    console.log(`\n***SIGNUP POST REQUEST***`);
    console.log(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send(`Email has already been taken`);
    }
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

// LOGIN LOGIC
async function loginLogic(req, res) {
  try {
    const details = {
      body: req.body,
      header: req.headers,
    };
    res.status(200).send(details);
    console.log(details);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { signupLogic, loginLogic };

// {
//   "body": {
//     "email": "ruth@gmail.com",
//     "password": "ruth1234"
//   },
//   "header": {
//     "content-length": "57",
//     "accept-encoding": "gzip, deflate, br",
//     "cookie": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjU0YmIxZGM2ZDZiOGQxMjA2MzY0YSIsImlhdCI6MTY2NzU4Mjg5OCwiZXhwIjoxNjY3NTg2NDk4fQ.JAtoEeHM2NJdtkTiKUxvz6ClVu8pHFfvK-R260-EX9c",
//     "accept": "*/*",
//     "user-agent": "Thunder Client (https://www.thunderclient.com)",
//     "content-type": "application/json",
//     "host": "127.0.0.1:8888",
//     "connection": "close"
//   }
// }

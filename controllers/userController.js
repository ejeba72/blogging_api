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

    const token = createToken(savedUser._id);
    res.cookie('jwt', token, { maxAge: expiration * 1000, httpOnly: true });

    res.status(201).send(`Hurray! Your sign up is successful!`);
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
    const { email, password } = req.body;
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: expiration * 1000, httpOnly: true });

    res
      .status(200)
      .send(`Hello ${user.firstName}! You've been logged in successfully.`);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// LOGOUT LOGIC
async function logoutLogic(req, res) {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send(`You've been logout successfully`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { signupLogic, loginLogic, logoutLogic };

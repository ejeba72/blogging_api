/* 
This is the Sign up route. For the post method, the validation I created in the user model works automatically, except that of the password field. I'm yet to know why. But I improvised a validation process for the password before hashing it. 
*/

const { genSalt, hash } = require('bcrypt');
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

    const pwdLength = newUser.password.length;
    console.log(pwdLength);

    if (!pwdLength) {
      return res.send('Password is required, of course! :) ');
    }

    if (pwdLength < 8) {
      return res.send(
        "Heads up, your password can't be less than 8 characters"
      );
    }

    if (pwdLength > 100) {
      return res.send(
        "Wow! Your password is impressive! Alas, we can't afford more than 100 characters for password"
      );
    }

    const salt = await genSalt(10);
    const hashedPasswd = await hash(password, salt);

    newUser.password = hashedPasswd;

    const savedUser = await newUser.save();

    const token = createToken(savedUser._id);
    res.cookie('jwt', token, { maxAge: expiration * 1000, httpOnly: true });

    res.status(201).send(`Hurray! Your sign up is successful!`);
    console.log(`\n***SIGNUP POST REQUEST***`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
}

// LOGIN LOGIC
async function loginLogic(req, res) {
  try {
    res.status(200).send(`hello, world`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { signupLogic, loginLogic };

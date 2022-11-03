/* 
This is the Sign up route. For the post method, the validation I created in the user model works automatically, except that of the password field. I'm yet to know why. But I improvised a validation process for the password before hashing it. 
*/

const { Router } = require('express');
const { genSalt, hash } = require('bcrypt');
const { User } = require('../Models/UserModel');

const route = Router();

route.post('/', async (req, res) => {
  // try {} catch (err) {}
  try {
    const { firstName, lastName, email, password, date } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      date,
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

    await newUser.save();

    res.status(201).send(`Hurray! Your sign up is successful!`);
    console.log(`\n***SIGNUP POST REQUEST***`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
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

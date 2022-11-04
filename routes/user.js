/* 
This is the Sign up route. For the post method, the validation I created in the user model works automatically, except that of the password field. I'm yet to know why. But I improvised a validation process for the password before hashing it. 
*/

const { Router } = require('express');
const { genSalt, hash } = require('bcrypt');
const { User } = require('../Models/UserModel');

const route = Router();

// SIGN UP ROUTE
route.post('/signup', async (req, res) => {
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

    await newUser.save();

    res.status(201).send(`Hurray! Your sign up is successful!`);
    console.log(`\n***SIGNUP POST REQUEST***`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = { route };

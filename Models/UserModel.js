const { Schema, model } = require('mongoose');

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Hey, your first name is required'],
    maxlength: [
      50,
      "Sorry, we can't afford  more than 50 characters for your first name",
    ],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Hey, your last name is required'],
    maxlength: [
      50,
      "Sorry, we can't afford  more than 50 characters for your first name",
    ],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required, of course! :)'],
    minlength: [8, "Heads up, your password can't be less than 8 characters"],
    maxlength: [
      100,
      "Wow! Your password is impressive! Alas, we can't afford more than 100 characters for password",
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model('User', userSchema);

module.exports = { UserModel };

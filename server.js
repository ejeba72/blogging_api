const express = 'express';

const exp = require(express);
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const { mongoDB } = require('./database/connection');
const { route: homeRoute } = require('./routes/homeRoute');
const { route: signupRoute } = require('./routes/signupRoute');

const app = exp();
const PORT = process.env.PORT;

// dotenv config and MongoDB connection
config();
mongoDB();

// Middlewares
app.use(exp.json());
app.use(cookieParser());
app.use('/', homeRoute);
app.use('/api/signup', signupRoute);
// app.use('/api/login', loginRoute);
// app.use('/api/logout', logoutRoute);

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

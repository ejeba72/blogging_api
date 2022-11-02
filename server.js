const express = require('express');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const { mongoDB } = require('./database/connection');
const { route: homeRoute } = require('./routes/homeRoute');
const { route: blogRoute } = require('./routes/blogRoute');
const { route: signupRoute } = require('./routes/signupRoute');

const app = express();
const PORT = process.env.PORT;

// dotenv config and MongoDB connection
config();
mongoDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/', homeRoute);
app.use('/api/blog', blogRoute);
app.use('/api/signup', signupRoute);
// app.use('/api/login', loginRoute);
// app.use('/api/logout', logoutRoute);

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

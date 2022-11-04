const express = require('express');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const { mongoDB } = require('./database/connection');
const { route: homeRoute } = require('./routes/homeRoute');
const { route: blogRoute } = require('./routes/blogRoute');
const { route: editRoute } = require('./routes/editRoute');
const { route: userRoute } = require('./routes/userRoute');
const { route: devRoute } = require('./routes/devRoute');

const app = express();
const PORT = process.env.PORT;

// dotenv config and MongoDB connection
config();
mongoDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/', homeRoute);
app.use('/api', blogRoute);
app.use('/api', editRoute);
app.use('/api', userRoute);
app.use('/api', devRoute);

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

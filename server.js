const express = require('express');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const { mongoDB } = require('./database/connection');
const { route: healthRoute } = require('./routes/healthRoute');
const { route: devRoute } = require('./routes/devRoute');
const { route: blogRoute } = require('./routes/blogRoute');
const { route: postRoute } = require('./routes/postRoute');
const { route: userRoute } = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT;
const apiV1 = '/api/v1';

// dotenv config and MongoDB connection
config();
mongoDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/', healthRoute);
app.use('/api', devRoute);
app.use(`${apiV1}/blogs`, blogRoute);
app.use(`${apiV1}/posts`, postRoute);
app.use(`${apiV1}/users`, userRoute);

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

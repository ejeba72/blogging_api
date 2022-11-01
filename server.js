const express = require('express');
const { config } = require('dotenv');
const { mongoDB } = require('./database/connection');

config();
mongoDB();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  console.log('Home route request');
  res.send(`Hello, This is a blogging app.`);
});

app.get('/api', (req, res) => {
  console.log('API route request');
  res.send(`Hello, This is a blogging API.`);
});

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

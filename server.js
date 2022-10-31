const express = require('express');
const { config } = require('dotenv');

config();

const app = express();
const PORT = process.env.PORT;
// const DB_URI = process.env.DB_URI;

app.get('/api', (req, res) => {
  console.log('hello, world');
  res.send(`hello, world`);
});

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

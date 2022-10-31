const express = require('express');
const { config } = require('dotenv');

config();

const app = express();
const PORT = process.env.PORT;
// const DB_URI = process.env.DB_URI;

app.get('/', (req, res) => {
  console.log('Testing microphone, Terry G');
  res.send(`My name is Optimus Prime`);
});

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});

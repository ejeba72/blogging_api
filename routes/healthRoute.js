const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
  console.log('API health check request');
  res.send(`Blogging API is healthy ;)`);
});

module.exports = { route };

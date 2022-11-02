const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
  console.log('Home route request');
  res.send(
    `This route is reserved for the homepage of the "proposed" blogging app ;)`
  );
});

module.exports = { route };

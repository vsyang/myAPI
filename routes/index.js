const router = require('express').Router();

// Swagger docs route
router.use('/', require('./swagger'));

// Example default route
router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send(`
    <h1>Welcome to My API</h1>
    <p>Click a link below to view the different routes:</p>
    <ul>
      <li><a href="/owners">Pet Owners</a></li>
      <li><a href="/pets">Pets</a></li>
      <li><a href="/api-docs">Swagger Documentation</a></li>
  `);
});

// Main resource routes
router.use('/owners', require('./owners'));
router.use('/pets', require('./pets'));

module.exports = router;

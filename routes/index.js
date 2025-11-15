const router = require('express').Router();

// Swagger docs route
router.use('/', require('./swagger'));

// Example default route
router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World!');
});

// Main resource routes
router.use('/owners', require('./owners'));
router.use('/pets', require('./pets'));

module.exports = router;

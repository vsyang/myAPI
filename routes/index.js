const router = require('express').Router();

// Main resource routes
router.use('/owners', require('./owners'));
router.use('/pets', require('./pets'));

// Swagger docs route
router.use('/', require('./swagger'));

// Take user to GitHub login to be authenticated
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Logged out main screen
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;

// Something I did for fun before needing OAuth
// router.get('/', (req, res) => {
//   //#swagger.tags=['Hello World']
//   res.send(`
//     <h1>Welcome to My API</h1>
//     <p>Click a link below to view the different routes:</p>
//     <ul>
//       <li><a href="/owners">Pet Owners</a></li>
//       <li><a href="/pets">Pets</a></li>
//       <li><a href="/api-docs">Swagger Documentation</a></li>
//   `);
// });

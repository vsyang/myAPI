const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');

const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', ownersController.getAllOwners);
router.get('/:id', ownersController.getSingleOwner);
router.post('/', isAuthenticated, validation.saveOwner, ownersController.createOwner);
router.put('/:id', isAuthenticated, validation.saveOwner, ownersController.updateOwner);
router.delete('/:id', isAuthenticated, ownersController.deleteOwner);

module.exports = router;
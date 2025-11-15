const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');
const validation = require('../middleware/validate');

router.get('/', ownersController.getAllOwners);

router.get('/:id', ownersController.getSingleOwner);

router.post('/', validation.saveOwner, ownersController.createOwner);

router.put('/:id', validation.saveOwner, ownersController.updateOwner);

router.delete('/:id', ownersController.deleteOwner);

router.get('/:id/pets', ownersController.getOwnerPets);

module.exports = router;

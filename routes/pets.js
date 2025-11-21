const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');

const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getSinglePet);
router.post('/', isAuthenticated, validation.savePet, petsController.createPet);
router.put('/:id', isAuthenticated, validation.savePet, petsController.updatePet);
router.delete('/:id',isAuthenticated, petsController.deletePet);

module.exports = router;
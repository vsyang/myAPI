const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
const validation = require('../middleware/validate');

router.get('/', petsController.getAllPets);

router.get('/:id', petsController.getSinglePet);

router.post('/', validation.savePet, petsController.createPet);

router.put('/:id', validation.savePet, petsController.updatePet);

router.delete('/:id', petsController.deletePet);

module.exports = router;

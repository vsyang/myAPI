const express = require('express');
const router = express.Router();

const petsController = require('../controllers/pets');
// const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', petsController.getAllPets);

router.get('/:id', petsController.getSinglePet);

router.post('/', isAuthenticated, petsController.createPet);

router.put('/:id', isAuthenticated, petsController.updatePet);

router.delete('/:id',isAuthenticated, petsController.deletePet);


//***** These were for when validation was needed *****/
// router.post('/', validation.savePet, petsController.createPet);

// router.put('/:id', validation.savePet, petsController.updatePet);

// router.delete('/:id', petsController.deletePet);

module.exports = router;

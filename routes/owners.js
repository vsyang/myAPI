const express = require('express');
const router = express.Router();

const ownersController = require('../controllers/owners');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ownersController.getAllOwners);
router.get('/:id', ownersController.getSingleOwner);
router.post('/', isAuthenticated, ownersController.createOwner);
router.put('/:id', isAuthenticated, ownersController.updateOwner);
router.delete('/:id', isAuthenticated, ownersController.deleteOwner);

module.exports = router;

//***** These were for when validation was needed *****/
// const validation = require('../middleware/validate');

// router.post('/', validation.saveOwner, ownersController.createOwner);
// router.put('/:id', validation.saveOwner, ownersController.updateOwner);
// router.delete('/:id', ownersController.deleteOwner);
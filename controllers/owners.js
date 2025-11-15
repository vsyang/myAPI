const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllOwners = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('owners')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingleOwner = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid owner id to find a owner.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('owners')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createOwner = async (req, res) => {
  const owner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };
  const response = await mongodb.getDb().db().collection('owners').insertOne(owner);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the owner.');
  }
};

const updateOwner = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid owner id to update a owner.');
  }
  const userId = new ObjectId(req.params.id);

  const owner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('owners')
    .replaceOne({ _id: userId }, owner);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the owner.');
  }
};

const deleteOwner = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid owner id to delete a owner.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('owners').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the owner.');
  }
};

const getOwnerPets = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const db = mongodb.getDb().db();

    // Find all pets with ownerId
    const pets = await db.collection('pets').find({ ownerId }).toArray();

    if (pets.length === 0) {
      return res.status(404).json({ message: 'No pets found for this owner.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving pets for owner', error: err });
  }
};

module.exports = {
  getAllOwners,
  getSingleOwner,
  createOwner,
  updateOwner,
  deleteOwner,
  getOwnerPets
};

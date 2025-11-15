const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPets = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('pets')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSinglePet = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid pet id to find a pet.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('pets')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createPet = async (req, res) => {
  const pet = {
    name: req.body.name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    breed: req.body.breed,
    weight: req.body.weight,
    sizeClass: req.body.sizeClass,
    temperament: req.body.temperament,
    ownerId: req.body.ownerId
  };
  const response = await mongodb.getDb().db().collection('pets').insertOne(pet);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the pet.');
  }
};

const updatePet = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid pet id to update a pet.');
  }
  const userId = new ObjectId(req.params.id);

  const pet = {
    name: req.body.name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    breed: req.body.breed,
    weight: req.body.weight,
    sizeClass: req.body.sizeClass,
    temperament: req.body.temperament
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .replaceOne({ _id: userId }, pet);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the pet.');
  }
};

const deletePet = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid pet id to delete a pet.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('pets').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the pet.');
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet
};

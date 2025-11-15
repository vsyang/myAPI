const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllPets = async (req, res) => {
  try {
    const pets = await mongodb.getDb().db().collection('pets').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(pets);
  } catch (err) {
    return res.status(500).json({ message: 'Unable to find pets list', error: err });
  }
};

const getSinglePet = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid pet id to find pet.');
    }
    const petId = new ObjectId(req.params.id);
    const pet = await mongodb.getDb().db().collection('pets').findOne({ _id: petId });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(pet);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching pet', error: err });
  }
};

const createPet = async (req, res) => {
  const pet = {
    name: req.body.name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    breed: req.body.breed,
    color: req.body.color,
    weight: req.body.weight,
    sizeClass: req.body.sizeClass,
    temperament: req.body.temperament,
    // petId: req.body.petId
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
    color: req.body.color,
    weight: req.body.weight,
    sizeClass: req.body.sizeClass,
    temperament: req.body.temperament,
    // petId: req.body.petId
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('pets')
    .replaceOne({ _id: userId }, pet);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the pet.');
  }
};

const deletePet = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid pet id to delete an pet.');
    }
    const petId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('pets').deleteOne({ _id: petId }); 
    if (response.deletedCount > 0) return res.status(204).send();
    return res.status(404).json({ message: 'Pet not found' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting pet', error: err });
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet
};

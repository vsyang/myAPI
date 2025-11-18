const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllOwners = async (req, res) => {
  try {
    const owners = await mongodb.getDb().db().collection('owners').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(owners);
  } catch (err) {
    return res.status(500).json({ message: 'Unable to find owners list', error: err });
  }
};

const getSingleOwner = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid owner id to find an owner.');
    }
    const ownerId = new ObjectId(req.params.id);
    const owner = await mongodb.getDb().db().collection('owners').findOne({ _id: ownerId });
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(owner);
  } catch (err) {
    return res.status(500).json({ message: 'Unable to find this page', error: err });
  }
};

const createOwner = async (req, res) => {
  try {
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
      .insertOne(owner);

    if (response.acknowledged) {
      return res.status(201).json(response);
    } else {
      return res
        .status(500)
        .json(response.error || 'Some error occurred while creating the owner.');
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Server error while creating the owner.' });
  }
};

const updateOwner = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid owner id to update an owner.');
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

    // console.log(response);

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res
        .status(500)
        .json(response.error || 'Some error occurred while updating the owner.');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Server error while updating the owner.'
    });
  }
};

const deleteOwner = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid owner id to delete an owner.');
    }
    const ownerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('owners').deleteOne({ _id: ownerId }); 
    if (response.deletedCount > 0) return res.status(204).send();
    return res.status(404).json({ message: 'Owner not found' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting owner', error: err });
  }
};

module.exports = {
  getAllOwners,
  getSingleOwner,
  createOwner,
  updateOwner,
  deleteOwner,
};

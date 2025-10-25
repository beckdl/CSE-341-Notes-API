const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;
const passCheck = require('../utils/passwordCheck');

const getAllUsers = async (req, res) => {
  try {
    const result = await db.getDb().db('CSE341').collection('Users').find();
    result.toArray().then((lists) => {
        res.status(200).json(lists);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

const getUserById = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    const result = await db.getDb().db('CSE341').collection('Users').find({ _id: userId });
    result.toArray().then((lists) => {
        res.status(200).json(lists[0]);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the user' });
  }
}

const createUser = async (req, res) => {
    try {
    const passChecked = await passCheck.checkPassword(req.body.password);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passChecked,
        favColor: req.body.favColor,
        age: req.body.age,
        phone: req.body.phone
    };
    const result = await db.getDb().db('CSE341').collection('Users').insertOne(user);   
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: 'Failed to create the user' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to create the user' });
    }
}

const updateUserById = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    const passChecked = await passCheck.checkPassword(req.body.password);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passChecked,
        favColor: req.body.favColor,
        age: req.body.age,
        phone: req.body.phone
    };
    const result = await db.getDb().db('CSE341').collection('Users').updateOne({ _id: userId }, { $set: user });
    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to update the user' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to update the user' });
    }   
}

const deleteUserById = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    const result = await db.getDb().db('CSE341').collection('Users').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: 'Failed to delete the user' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to delete the user' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};
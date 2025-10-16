const db = require('../database/db');
const ObjectId = require('mongodb').ObjectId;

const getAllNotes = async (req, res) => {
  try {
    const result = await db.getDb().db('CSE341').collection('Notes').find();
    result.toArray().then((lists) => {
        res.status(200).json(lists);
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
}

const getNoteById = async (req, res) => {
  try {
    const noteId = new ObjectId(req.params.id);
    const result = await db.getDb().db('CSE341').collection('Notes').find({ _id: noteId });
    result.toArray().then((lists) => {
        res.status(200).json(lists[0]);
    })
    } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the note' });
  }
}

const createNote = async (req, res) => {
    try {
    const note = {
        title: req.body.title,
        note: req.body.note
    };
    const result = await db.getDb().db('CSE341').collection('Notes').insertOne(note);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: 'Failed to create the note' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to create the note' });
    }
}

const updateNoteById = async (req, res) => {
    try {
    const noteId = new ObjectId(req.params.id);
    const note = {
        title: req.body.title,
        note: req.body.note
    };
    const result = await db.getDb().db('CSE341').collection('Notes').updateOne({ _id: noteId }, { $set: note });
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to update the note' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to update the note' });
    }
}

const deleteNoteById = async (req, res) => {
    try {
    const noteId = new ObjectId(req.params.id);
    const result = await db.getDb().db('CSE341').collection('Notes').deleteOne({ _id: noteId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to delete the note' });
    }
    } catch (err) {
    res.status(500).json({ error: 'Failed to delete the note' });
    }   
}

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNoteById,
    deleteNoteById
};
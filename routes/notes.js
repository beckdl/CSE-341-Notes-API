const router = require('express').Router();
const notesController = require('../controllers/notes');
const validate = require('../validation/validate.js')

router.get('/', notesController.getAllNotes);
router.post('/', validate.saveNote, notesController.createNote);
router.get('/:id', notesController.getNoteById);
router.put('/:id', validate.saveNote, notesController.updateNoteById);
router.delete('/:id', notesController.deleteNoteById);

module.exports = router;
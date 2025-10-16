const router = require('express').Router();
const notesController = require('../controllers/notes');

router.get('/', notesController.getAllNotes);
router.post('/', notesController.createNote);
router.get('/:id', notesController.getNoteById);
router.put('/:id', notesController.updateNoteById);
router.delete('/:id', notesController.deleteNoteById);

module.exports = router;
const router = require('express').Router();
const notesRoutes = require('./notes');
const baseController = require('../controllers');

router.get('/', baseController.welcome);

router.use('/notes', notesRoutes);

module.exports = router;
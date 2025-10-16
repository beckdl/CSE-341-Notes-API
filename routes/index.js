const router = require('express').Router();
const notesRoutes = require('./notes');
const baseController = require('../controllers');
const swagger = require('./swagger');

router.get('/', baseController.welcome);

router.use('/notes', notesRoutes);

router.use('/api-docs', swagger);

module.exports = router;
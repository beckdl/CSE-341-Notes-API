const router = require('express').Router();
const baseController = require('../controllers');
const notesRoutes = require('./notes');
const swagger = require('./swagger');
const usersRoutes = require('./users');
const { requiresAuth } = require('express-openid-connect');

router.get('/', baseController.welcome);

router.use('/notes', requiresAuth(), notesRoutes);

router.use('/api-docs', requiresAuth(), swagger);

router.use('/users', requiresAuth(), usersRoutes);


module.exports = router;
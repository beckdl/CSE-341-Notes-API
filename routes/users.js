const router = require('express').Router();
const usersController = require('../controllers/users');
const validate = require('../validation/validate.js')

router.get('/', usersController.getAllUsers);
router.post('/', validate.saveUser, usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', validate.saveUser, usersController.updateUserById);
router.delete('/:id', validate.saveUser, usersController.deleteUserById);

module.exports = router;
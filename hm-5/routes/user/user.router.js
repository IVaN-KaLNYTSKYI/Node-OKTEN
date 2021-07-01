const router = require('express').Router();

const { userController } = require('../../controllers');
const { isUserValid, idValid } = require('../../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    isUserValid,
    userController.createUser);

router.get('/:userId',
    idValid,
    userController.getUserById);

router.delete('/:userId',
    idValid,
    userController.removeUserById);

router.patch('/:userId',
    idValid,
    isUserValid,
    userController.updateUser);

module.exports = router;

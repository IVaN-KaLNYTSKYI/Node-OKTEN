const router = require('express').Router();

const { userController } = require('../../controllers');
const { isUserValid } = require('../../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    isUserValid.createMiddleware,
    userController.createUser);

router.get('/:userId',
    isUserValid.idMiddleware,
    userController.getUserById);

router.delete('/:userId',
    isUserValid.idMiddleware,
    userController.removeUserById);

router.patch('/:userId',
    isUserValid.idMiddleware,
    isUserValid.updateMiddleware,
    userController.updateUser);

module.exports = router;

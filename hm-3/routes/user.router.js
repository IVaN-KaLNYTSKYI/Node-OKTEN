const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);
router.get('/:userId', userMiddleware.checkIsValid, userController.getUserById);
router.post('/', userMiddleware.isUserValid, userController.createUsers);
router.delete('/:userId', userMiddleware.isUserValidId, userController.removeUserById);
router.patch('/:userId', userMiddleware.isUserValid, userController.updateUserById);

module.exports = router;

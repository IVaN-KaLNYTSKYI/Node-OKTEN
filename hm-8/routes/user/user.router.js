const router = require('express').Router();

const { userController } = require('../../controllers');
const {
    isUserValid, authValid, fileMiddleware, goodsMiddleware
} = require('../../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    fileMiddleware.checkFile,
    isUserValid.createMiddleware,
    userController.createUser);

router.get('/:userId',
    isUserValid.idMiddleware,
    userController.getUserById);

router.delete('/:userId',
    authValid.checkAccessToken,
    isUserValid.idMiddleware,
    userController.removeUserById);

router.patch('/:userId',
    authValid.checkAccessToken,
    isUserValid.idMiddleware,
    isUserValid.updateMiddleware,
    userController.updateUser);

router.post('/:userId/avatar',
    authValid.checkAccessToken,
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    isUserValid.idMiddleware,
    userController.addAvatar);

router.post('/:userId/gallery',
    authValid.checkAccessToken,
    fileMiddleware.checkFile,
    isUserValid.idMiddleware,
    userController.addGallery);

router.post('/:userId/add', goodsMiddleware.addBasket, userController.addGoods);

router.post('/:userId/removeBasket', userController.removeGoodsBasket);

module.exports = router;

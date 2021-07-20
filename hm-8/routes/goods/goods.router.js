const router = require('express').Router();

const { goodsController } = require('../../controllers');

router.get('/', goodsController.getAllGoods);

router.post('/', goodsController.createGoods);

module.exports = router;

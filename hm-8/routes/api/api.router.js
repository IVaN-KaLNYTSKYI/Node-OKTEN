const router = require('express').Router();

const userRouter = require('../user');
const authRouter = require('../auth');
const mailRouter = require('../mail');
const goodsRouter = require('../goods');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/email', mailRouter);
router.use('/goods', goodsRouter);

module.exports = router;

const router = require('express').Router();

const userRouter = require('../user');
const authRouter = require('../auth');

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;

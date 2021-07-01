const router = require('express').Router();
const { authController } = require('../../controllers');
const { authValid } = require('../../middlewares');

router.post('/', authValid, authController.login);

module.exports = router;

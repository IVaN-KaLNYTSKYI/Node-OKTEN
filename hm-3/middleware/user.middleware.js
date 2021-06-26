const { userService } = require('../services');
const { errorMessages } = require('../constants');

module.exports = {
    checkIsValid: (req, res, next) => {
        const { userId } = req.params;
        const userById = userService.findOneById(userId);

        if (userId < 1) {
            throw new Error(errorMessages.NOT_VALID_ID);
        }

        if (!userById) {
            throw new Error(errorMessages.USER_NOT_FOUND);
        }

        req.user = userById;

        next();
    },

    isUserValid: (req, res, next) => {
        const { name, password } = req.body;

        if (!name || !password) {
            throw new Error(errorMessages.SOME_FIELD_IS_EMPTY);
        }

        if (password.length < 8) {
            throw new Error(errorMessages.PASSWORD_SMALL);
        }

        next();
    },
};

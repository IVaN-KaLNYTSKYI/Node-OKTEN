const { userService } = require('../services');
const { errorMessages } = require('../constants');

module.exports = {
    checkIsValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userById = await userService.findOneById(userId);

            if (userId < 0) {
                throw new Error(errorMessages.NOT_VALID_ID);
            }

            if (!userById) {
                throw new Error(errorMessages.USER_NOT_FOUND);
            }

            req.user = userById;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserValid: async (req, res, next) => {
        try {
            const { name, password } = req.body;

            const users = await userService.findUsers();

            if (!name || !password) {
                throw new Error(errorMessages.SOME_FIELD_IS_EMPTY);
            }

            if (password.length < 8) {
                throw new Error(errorMessages.PASSWORD_SMALL);
            }

            users.forEach((value) => {
                if (value.name === name) {
                    throw new Error(errorMessages.NOT_EXISTS);
                }
            });
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserValidId: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userById = await userService.findOneById(userId);

            if (!userById) {
                throw new Error(errorMessages.USER_NOT_FOUND);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserValidUpdate: async (req, res, next) => {
        try {
            const { name, password } = req.body;

            const users = await userService.findUsers();

            if (!users[req.params.id]) {
                throw new Error(errorMessages.USER_NOT_FOUND);
            }
            if (!name || !password) {
                throw new Error(errorMessages.SOME_FIELD_IS_EMPTY);
            }

            if (password.length < 8) {
                throw new Error(errorMessages.PASSWORD_SMALL);
            }

            users.forEach((value) => {
                if (value.name === name) {
                    throw new Error(errorMessages.NOT_EXISTS);
                }
            });

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};

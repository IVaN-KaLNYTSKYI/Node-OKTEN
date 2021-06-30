const { userService } = require('../services');
const { codesEnum } = require('../errors');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUser();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body);

            res.status(codesEnum.CREATE).json(createdUser);
        } catch (e) {
            next(e);
        }
    },
    getUserById: (req, res) => {
        const { user } = req;

        res.json(user);
    },

    removeUserById: async (req, res, next) => {
        try {
            await userService.removeUser({ _id: req.params.userId });

            res.json('user remove');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            await userService.updateUser(req.params.userId, req.body);

            res.json('update');
        } catch (e) {
            next(e);
        }
    },

};

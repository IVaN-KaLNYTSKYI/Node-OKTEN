const { userService } = require('../services');
const { errorMessages } = require('../constants');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.findUsers();

        res.json(users);
    },

    createUsers: async (req, res) => {
        const userObject = req.body;

        await userService.createUser(userObject);

        res.status(201).json(errorMessages.USER_IS_CREATED);
    },

    removeUserById: async (req, res) => {
        const { userId } = req.params;

        await userService.removeUser(userId);

        res.status(200).json(errorMessages.USER_WAS_DELETED);
    },

    getUserById: (req, res) => {
        const { user } = req;

        res.json(user);
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;
        const userNewObject = req.body;

        await userService.updateUser(userId, userNewObject);

        res.json(errorMessages.USER_WAS_UPDATE);
    },

};

const { userService } = require('../services');
const { errorMessages } = require('../constants');

module.exports = {
    getAllUsers: (req, res) => {
        const users = userService.findUsers();

        res.json(users);
    },

    createUsers: (req, res) => {
        const userObject = req.body;

        userService.createUser(userObject);

        res.status(201).json(errorMessages.USER_IS_CREATED);
    },

    removeUserById: (req, res) => {
        const { userId } = req.params;

        userService.removeUser(userId);

        res.status(200).json(errorMessages.USER_WAS_DELETED);
    },

    getUserById: (req, res) => {
        const { user } = req;

        res.json(user);
    },

    updateUserById: (req, res) => {
        const { id } = req.params;
        const userNewObject = req.body;

        userService.updateUser(id, userNewObject);

        res.json(errorMessages.USER_WAS_UPDATE);
    },

};

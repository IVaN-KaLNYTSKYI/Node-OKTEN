const { userService } = require('../services');
const { codesEnum } = require('../errors');
const { passwordHasher } = require('../helpers');
const { mailService } = require('../services');
const { emailActionEnum } = require('../constants');

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
            const { password, email, name } = req.body;

            const hashedPassword = await passwordHasher.hash(password);

            const createdUser = await userService.createUser({ ...req.body, password: hashedPassword });

            await mailService.sendMail(email, emailActionEnum.WELCOME, { userName: name, email });

            res.status(codesEnum.CREATE).json(createdUser);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = await userService.getSingleUser({ _id: req.params.userId });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    removeUserById: async (req, res, next) => {
        try {
            const { user } = req;

            await userService.removeUser({ _id: req.params.userId });

            await mailService.sendMail(user.email, emailActionEnum.REMOVE, { userName: user.name });

            res.json('user remove');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {
                password, name, email
            } = req.body;

            const hashedPassword = await passwordHasher.hash(password);

            await userService.updateUser(req.params.userId, {
                ...req.body, password: hashedPassword
            });

            await mailService.sendMail(email, emailActionEnum.UPDATE, { userName: name });

            res.json('update');
        } catch (e) {
            next(e);
        }
    },

};

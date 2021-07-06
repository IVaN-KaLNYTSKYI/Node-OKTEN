const { AUTHORIZATION } = require('../constants/constant');
const { passwordHasher } = require('../helpers');
const { ErrorHandler } = require('../errors');
const { errorMess, codesEnum } = require('../errors');
const { authHelper } = require('../helpers');
const { OAuth } = require('../dataBase');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(codesEnum.BAD_REQUEST,
                    errorMess.WRONG_EMAIL_OF_PASSWORD.message,
                    errorMess.WRONG_EMAIL_OF_PASSWORD.code);
            }

            await passwordHasher.compare(password, user.password);

            const tokens = authHelper.generateToken();

            await OAuth.create({ ...tokens, user: user._id });

            res.json({ ...tokens, user: req.user });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await OAuth.remove({ accessToken: token });
            res.status(codesEnum.NO_CONTENT).json('Success');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const { user } = req;

            await OAuth.remove({ refreshToken: token });

            const tokens = authHelper.generateToken();

            await OAuth.create({ ...tokens, user: user._id });

            res.json({ ...tokens, user: req.user });
        } catch (e) {
            next(e);
        }
    }
};

const { ErrorHandler } = require('../../errors');
const { authValidator } = require('../../validators');
const { errorMess, codesEnum } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.getSingleUser({ email });

        const { error } = await authValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};

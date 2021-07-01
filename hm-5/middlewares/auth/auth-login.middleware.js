const { ErrorHandler } = require('../../errors');
const { authValidator } = require('../../validators');
const { errorMess } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.getSingleUser({ email });

        const { error } = await authValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(404, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        if (!user) {
            throw new ErrorHandler(404, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};

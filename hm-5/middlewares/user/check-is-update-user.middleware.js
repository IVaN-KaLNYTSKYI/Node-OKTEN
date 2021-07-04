const { ErrorHandler } = require('../../errors');
const { validatorUser } = require('../../validators');
const { userService } = require('../../services');
const { errorMess } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const { error } = await validatorUser.updateValidator.validate(req.body);

        const user = await userService.getSingleUser({ email });

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

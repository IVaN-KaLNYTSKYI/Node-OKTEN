const { ErrorHandler } = require('../../errors');
const { errorMess } = require('../../errors');
const { userService } = require('../../services');
const { validatorUser } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { error } = await validatorUser.idValidator.validate(req.params.id);

        const user = await userService.getSingleUser({ _id: userId });

        if (error) {
            throw new ErrorHandler(400, errorMess.NOT_VALID_ID.message, errorMess.NOT_VALID_ID.code);
        }

        if (!user) {
            throw new ErrorHandler(404, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};

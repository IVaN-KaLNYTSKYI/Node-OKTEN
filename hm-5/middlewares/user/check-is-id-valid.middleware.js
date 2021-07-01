const { ErrorHandler } = require('../../errors');
const { errorMess } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await userService.getSingleUser({ _id: userId });

        if (userId < 0) {
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

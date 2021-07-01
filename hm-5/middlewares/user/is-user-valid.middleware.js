const { ErrorHandler } = require('../../errors');
const { validatorCreate } = require('../../validators');
const { userService } = require('../../services');
const { errorMess } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { name } = req.body;
        const users = await userService.findUser();
        const { error } = await validatorCreate.validate(req.body);

        if (error) {
            throw new ErrorHandler(404, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        users.forEach((value) => {
            if (value.name === name) {
                throw new ErrorHandler(409, errorMess.NOT_EXISTS.message, errorMess.NOT_EXISTS.code);
            }
        });
        next();
    } catch (e) {
        next(e);
    }
};

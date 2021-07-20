const { goodsService } = require('../../services');
const { ErrorHandler } = require('../../errors');
const { userService } = require('../../services');
const { errorMess, codesEnum } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { body: { basket }, params: { userId } } = req;

        const goods = await goodsService.getSingleGoods({ _id: basket });

        if (!goods) {
            throw new ErrorHandler(codesEnum.CONFLICT, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        const user = await userService.getSingleUser({ _id: userId });

        user.basket.forEach(((value) => {
            if (value === basket) {
                throw new ErrorHandler(codesEnum.CONFLICT, errorMess.NOT_EXISTS.message, errorMess.NOT_EXISTS.code);
            }
        }));

        next();
    } catch (e) {
        next(e);
    }
};

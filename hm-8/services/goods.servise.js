const { Goods } = require('../dataBase');

module.exports = {
    findGoods: () => Goods.find({}),

    getSingleGoods: (params) => Goods.findOne(params),

    createGoods: (objectUser) => Goods.create(objectUser),

    updateGoods: (userId, updateBody) => Goods.updateOne({ _id: userId }, updateBody),

    removeGoods: (id) => Goods.deleteOne({ _id: id }),
};

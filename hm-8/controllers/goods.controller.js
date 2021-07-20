const { goodsService } = require('../services');

module.exports = {

    getAllGoods: async (req, res, next) => {
        try {
            const goods = await goodsService.findGoods().lean();

            res.json(goods);
        } catch (e) {
            next(e);
        }
    },

    createGoods: async (req, res, next) => {
        try {
            const created = await goodsService.createGoods({ ...req.body });

            res.json(created);
        } catch (e) {
            next(e);
        }
    },

};

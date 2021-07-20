const { Schema, model } = require('mongoose');

const { dataBaseEnum } = require('../constants');

const goodsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(dataBaseEnum.GOODS, goodsSchema);

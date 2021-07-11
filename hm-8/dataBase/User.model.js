const { Schema, model } = require('mongoose');

const { dataBaseEnum } = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    gallery: [{ type: String }],
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        default: 15
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(dataBaseEnum.USER, userSchema);

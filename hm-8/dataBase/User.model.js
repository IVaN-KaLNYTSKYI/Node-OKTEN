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
        unique: false,
        required: true
    },

    basket: [{ type: Schema.Types.Mixed }],

    age: {
        type: Number,
        default: 15
    },

    password: {
        type: String,
        required: true
    },

    activate_token: {
        type: String
    },

    activate_status: {
        type: String,
        required: true
    },

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('userBasket', {
    ref: dataBaseEnum.GOODS,
    localField: 'basket',
    foreignField: '_id',
});

userSchema
    .pre('find', function() {
        console.log('ok1');
        this.populate('userBasket');
    })
    .pre('findOne', function() {
        console.log('ok2');

        this.populate('userBasket');
    });

module.exports = model(dataBaseEnum.USER, userSchema);

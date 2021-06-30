const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.use(_hadleErrors);

app.listen(constants.PORT, () => {
    console.log(constants.PORT);
});

function _connectDB() {
    mongoose.connect(constants.DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('bd ok'))
        .catch((eror) => console.log(eror));
}

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.code || 0
        });
}

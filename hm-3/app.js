const express = require('express');
const path = require('path');

const { userRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(constants.PORT, () => {
    console.log(constants.PORT);
});

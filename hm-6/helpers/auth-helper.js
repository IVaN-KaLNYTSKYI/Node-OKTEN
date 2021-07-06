const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { constants } = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateToken: () => {
        const accessToken = jwt.sign({}, constants.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({}, constants.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, tokenType = 'access') => {
        const secretWord = tokenType === 'access' ? constants.ACCESS_TOKEN_SECRET : constants.REFRESH_TOKEN_SECRET;

        await verifyPromise(token, secretWord);
    }
};

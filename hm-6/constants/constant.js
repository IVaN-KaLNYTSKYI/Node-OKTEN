module.exports = {
    PORT: 3000,
    DB: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/feb-2021',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ewrewfcdsvd',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'EFDVSDVSDWDFSDF',
    AUTHORIZATION: 'Authorization',
};

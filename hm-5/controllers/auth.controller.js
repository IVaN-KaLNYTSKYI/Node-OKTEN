const { passwordHasher } = require('../helpers');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { user } = req;

            await passwordHasher.compare(password, user.password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};

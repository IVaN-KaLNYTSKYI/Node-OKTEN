const { passwordHasher } = require('../helpers');
const { userService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.getSingleUser({ email });

            await passwordHasher.compare(password, user.password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};

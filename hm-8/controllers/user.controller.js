const { userService } = require('../services');
const { codesEnum } = require('../errors');
const { passwordHasher, fileHelpers, userHelper } = require('../helpers');
const { mailService } = require('../services');
const { emailActionEnum } = require('../constants');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUser().lean();
            const usersArr = [];

            for (let i = 0; i < users.length; i++) {
                const normalizedUser = userHelper.userNormalizator(users[i]);
                usersArr.push(normalizedUser);
            }

            res.json(usersArr);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            [req.avatar] = req.photos;
            const { user: { password, email, name }, photos, avatar } = req;

            const photosArr = [];

            const hashedPassword = await passwordHasher.hash(password);

            const createdUser = await userService.createUser({ ...req.user, password: hashedPassword });

            const { _id } = createdUser;

            if (avatar) {
                const { finalPath, photoPath } = await fileHelpers.fileDownload(avatar.name, _id, 'users', 'avatar');

                await avatar.mv(finalPath);

                await userService.updateUser({ _id }, { avatar: photoPath });
            }

            console.log(photos);
            if (photos) {
                for (let i = 0; i < photos.length; i++) {
                    console.log(photos[i].name);
                    // eslint-disable-next-line no-await-in-loop
                    const { finalPath, photoPath } = await fileHelpers.fileDownload(photos[i].name, _id, 'users', 'gallery');
                    // eslint-disable-next-line no-await-in-loop
                    await photos[i].mv(finalPath);

                    photosArr.push(photoPath);
                }
                await userService.updateUser({ _id }, { $set: { gallery: photosArr } });
            }

            await mailService.sendMail(email, emailActionEnum.WELCOME, { userName: name, token: createdUser.activate_token });

            const normalizedUser = userHelper.userNormalizator(createdUser.toJSON());

            res.status(codesEnum.CREATE).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await userService.getSingleUser({ _id: req.params.userId }).lean();

            const normalizedUser = userHelper.userNormalizator(user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    removeUserById: async (req, res, next) => {
        try {
            const { user } = req;

            await userService.removeUser(req.params.userId);

            await fileHelpers.removeFileID(req.params.userId);

            await mailService.sendMail(user.email, emailActionEnum.REMOVE, { userName: user.name });

            res.json('user remove');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                password, name, email
            } = req.body;

            const hashedPassword = await passwordHasher.hash(password);

            await userService.updateUser(req.params.userId, {
                ...req.body, password: hashedPassword
            });

            await mailService.sendMail(email, emailActionEnum.UPDATE, { userName: name });

            res.json('update');
        } catch (e) {
            next(e);
        }
    },

    addAvatar: async (req, res, next) => {
        try {
            const { avatar, user, photos } = req;

            const { _id, gallery } = user;

            const photosArr = [...gallery];

            await fileHelpers.removeFileID(req.params.userId, 'avatar');

            if (avatar) {
                const { finalPath, photoPath } = await fileHelpers.fileDownload(avatar.name, _id, 'users', 'avatar');

                await avatar.mv(finalPath);

                await userService.updateUser({ _id }, { avatar: photoPath });

                for (let i = 0; i < photos.length; i++) {
                    // eslint-disable-next-line no-await-in-loop,no-shadow
                    const { finalPath, photoPath } = await fileHelpers.fileDownload(photos[i].name, _id, 'users', 'gallery');
                    // eslint-disable-next-line no-await-in-loop
                    await photos[i].mv(finalPath);

                    photosArr.push(photoPath);
                }
                await userService.updateUser({ _id }, { $set: { gallery: photosArr } });
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    addGallery: async (req, res, next) => {
        try {
            const { user, photos } = req;

            const { _id, gallery } = user;

            const photosArr = [...gallery];

            if (photos.length) {
                for (let i = 0; i < photos.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    const { finalPath, photoPath } = await fileHelpers.fileDownload(photos[i].name, _id, 'users', 'gallery');
                    // eslint-disable-next-line no-await-in-loop
                    await photos[i].mv(finalPath);
                    photosArr.push(photoPath);
                }
                await userService.updateUser({ _id }, { $set: { gallery: photosArr } });
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    addGoods: async (req, res, next) => {
        try {
            const a = await userService.updateUser(req.params.userId, { $push: { basket: req.body.basket } });

            res.json(a);
        } catch (e) {
            next(e);
        }
    },

    removeGoodsBasket: async (req, res, next) => {
        try {
            const { body: { id }, params: { userId } } = req;

            const user = await userService.getSingleUser({ _id: userId });

            const userFilter = user.basket.filter((value) => value !== id);

            const userUpdate = await userService.updateUser(userId, { $set: { basket: userFilter } });

            console.log(userUpdate);

            res.json('update!!!!!!');
        } catch (e) {
            next(e);
        }
    },

};

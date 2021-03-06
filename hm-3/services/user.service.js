const fs = require('fs');
const path = require('path');
const utils = require('util');

const pathFile = path.join(process.cwd(), 'dataBase', 'users.json');

const write = utils.promisify(fs.writeFile);
const read = utils.promisify(fs.readFile);

const getAllUsers = () => read('./dataBase/users.json').then((value) => JSON.parse(value.toString()));

module.exports = {

    findUsers: () => getAllUsers(),

    createUser: async (userObject) => {
        const allUsers = await getAllUsers();

        allUsers.push({ id: allUsers.length + 1, ...userObject });

        await write(pathFile, JSON.stringify(allUsers));
    },

    findOneById: async (userId) => {
        const allUsers = await getAllUsers();

        const user = allUsers.find((value) => (value.id === +userId));

        return user;
    },

    removeUser: async (userId) => {
        const allUsers = await getAllUsers();

        const users = allUsers.filter((value) => (value.id !== +userId));

        // allUsers.splice(userId, 1);

        await write(pathFile, JSON.stringify(users));
    },

    updateUser: async (userId, userNewObject) => {
        const allUsers = await getAllUsers();

        allUsers[userId] = { ...allUsers[userId], ...userNewObject };

        await write(pathFile, JSON.stringify(allUsers));
    }

};

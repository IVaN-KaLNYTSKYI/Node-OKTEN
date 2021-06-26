const fs = require('fs');
const path = require('path');

const pathFile = path.join(process.cwd(), 'dataBase', 'users.json');

let users = [];

const getAllUsers = () => {
    const data = fs.readFileSync(pathFile);
    users = JSON.parse(data.toString());
    return users;
};

const writeUser = (user) => {
    fs.writeFile(pathFile, JSON.stringify(user), ((err) => err && console.log(err)));
};

module.exports = {
    findUsers: () => getAllUsers(),

    createUser: (userObject) => {
        getAllUsers();

        users.push(userObject);

        writeUser(users);
    },

    findOneById: (userId) => {
        getAllUsers();

        return users[userId];
    },

    removeUser: (userId) => {
        getAllUsers();

        users.splice(userId, 1);

        writeUser(users);
    },

    updateUser: (userId, userNewObject) => {
        getAllUsers();

        users.forEach((value, index) => {
            if (index === +userId) {
                users[index] = userNewObject;
            }
        });
        writeUser(users);
    }

};

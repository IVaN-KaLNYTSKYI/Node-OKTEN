const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

const pathFile = path.join(__dirname, 'db', 'db.json');

function getAllUsers(){
    const data = fs.readFileSync(pathFile);
    return JSON.parse(data.toString());
}

app.get('/users', (req, res) => {
    const allUsers = getAllUsers();
    res.render('users', {allUsers});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const allUsers = getAllUsers();
    const user=allUsers[userId-1];

    res.render('user', {user});
});

app.post('/register', (req, res) => {
    const {email} = req.body;
    const allUsers = getAllUsers();
    const flag = allUsers.some((value => value.email === email));

    if (flag) {
        res.redirect('/error');
        return;
    }
    const users = [];

    allUsers.forEach((value1) => {
        users.push(value1);
    })
    users.push(req.body);

    fs.writeFile(pathFile, JSON.stringify(users), (err => err && console.log(err)));

    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const allUsers = getAllUsers();
    const user = allUsers.find((value => value.email === email && value.password === password));

    let id=(allUsers.indexOf(user)+1);
    console.log(id)

    if (user) {
        res.redirect(`/users/${id}`);
        return;
    }

    res.redirect('/register');

});

app.listen(5000, () => {
    console.log("5000");
});


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

app.get('/users', (req, res) => {
    const data = fs.readFileSync(pathFile);
    const allUsers = JSON.parse(data.toString());
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
    const data = fs.readFileSync(pathFile);
    const allUsers = JSON.parse(data.toString());
    const user = allUsers.find((value => value.email === userId));

    res.render('user', {user});
});

app.post('/register', (req, res) => {
    const {email} = req.body;
    const data = fs.readFileSync(pathFile);
    const allUsers = JSON.parse(data.toString());
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
    const data = fs.readFileSync(pathFile);
    const allUsers = JSON.parse(data.toString());
    const user = allUsers.find((value => value.email === email && value.password === password));

    if (user) {
        res.redirect(`/users/${user.email}`);
        return;
    }

    res.redirect('/register');

});

app.listen(5000, () => {
    console.log("3000");
});


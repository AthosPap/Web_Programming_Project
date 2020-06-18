const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const dotenv = require('dotenv').config({ path: __dirname + '/values.env' });
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(session({
    store: new MongoStore({ url: process.env.MONGO_URL,
    ttl: 10 * 60}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null, sameSite: true }
}));


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Διαδρομές
const routes = require('./routes/tennis-club-routes');
app.use('/', routes);


//Χρήση των views
//Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, αλλιώς δεν θα αναγνωριστεί το extname (αλλιώς τα αρχεία θα πρέπει να τελειώνουν με .handlebars)
app.engine('hbs', exphbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

module.exports = app;

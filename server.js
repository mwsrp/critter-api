const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const auth = require('./lib/auth');

const app = express();

// Setup body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Init passport
app.use(passport.initialize());

// Init session
app.use(session({
	key: 'shark_treats',
	secret: 'tasty_tasty_plankton',
	store: new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    schema: {
      tableName: 'critter_sessions'
    }
  }),
	resave: true,
	saveUninitialized: true
}));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.listen(process.env.PORT || 9000);
/* deps */
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3002;

const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

/* Middleware */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'appSecretGoesHere',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

/* Routes */
app.use('/user', require('./routes/user'));
app.use('/user/settings', require('./routes/settings'));
app.use('/1/api', require('./routes/tag'));

app.get('/', (req, res) => {
	res.send('Hello World')
});

/* Serve */
app.listen(port, () => {
	console.log("Listening at " + port);
})

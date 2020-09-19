/* deps */
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 3002;

const passport = require('passport');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

/* Middleware */
app.use(cors({origin: process.env.FRONTEND, credentials: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({secret:'shhhhhh-login', sameSite: 'strict', signed: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));


/* Routes */
app.use('/user', require('./routes/user'));
app.use('/user/settings', require('./routes/settings'));
app.use('/1/api', require('./routes/tag'));

app.get('/', (req, res) => {
	if (req.user) {
		res.status(200).send({msg: 'Login success.'})
	} else {
		res.status(500).send({msg: 'No active login.'})
	}
});

/* Serve */
app.listen(port, () => {
	console.log("Listening at " + port);
})

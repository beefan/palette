const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

app.use('/user', require('./routes/user'));
app.use('/user/settings', require('./routes/settings'));
app.use('/1/api/', require('./routes/tag'));

app.get('/', (req, res) => {
	res.send('Home Page!')
});

app.listen(port, () => {
	console.log("Listening at " + port);
})

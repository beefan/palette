const db = require('./database');
const bcrypt = require('bcrypt');

async function loginUser(req, username, password, done) {
    try {
        const sql = 'SELECT id, username, email, password FROM users WHERE username=$1';
        const {rows} = await db.query(sql, [username]);

        if (rows[0] == null) {
            console.error('Incorrect Login Details');
            return done();
        } else {
            bcrypt.compare(password, rows[0].password, (err, check) => {
                if (err) {
                    console.error('Error while checking password');
                    return done();
                } else if (check) {
                    return done(null, [{id: rows[0].id, email: rows[0].email, username: rows[0].username}]);
                } else {
                    console.error('Incorrect login details');
                    return done();
                }
            })
        }
    } catch (err) {
        console.error(err);
    }
}

async function saveUser(req, res) {
    const password = await bcrypt.hash(req.body.password, 5);
    const username = req.body.username;
    const email = req.body.email;

    try {
        const sql = 'SELECT id FROM users WHERE username=$1';
        const {rows} = await db.query(sql, [username]);
        if (rows[0] != null) {
            res.status(409).send({msg: 'This username has already been registered.'})
        } else {
            const sql2 = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
            await db.query(sql2, [username, email, password]);
            res.status(200).send({msg: 'User account created successfully.'});
        }
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

module.exports  = {
    loginUser,
    saveUser
}
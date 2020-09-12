const db = require('./database');

async function loginUser(req, res) {
    // do something with the request body to get the user data
    
    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

async function saveUser(req, res) {
    // do something with the request body to get the user data

    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

module.exports  = {
    loginUser,
    saveUser
}
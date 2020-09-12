const db = require('./database');

async function getUserSettings(req, res) {
    const userId = parseInt(req.params.userId)

    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

async function saveUserSettings(req, res) {
    const userId = parseInt(req.params.userId)
    // do something with the request body to get the settings

    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

module.exports  = {
    getUserSettings,
    saveUserSettings
}
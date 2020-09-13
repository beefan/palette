const db = require('./database');

async function getUserSettings(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    try {
        const sql = 'SELECT prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs FROM settings WHERE userid=$1';
        const {rows} = await db.query(sql, [userid]);
        console.log('rows: ', rows), userid;
        res.status(200).send(rows);
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
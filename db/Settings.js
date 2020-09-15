const db = require('./database');

async function getUserSettings(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    try {
        const {rows} = await db.query('SELECT prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs ' +
                                        'FROM settings WHERE userid=$1', [userid]);
        if (rows[0]) {
            res.status(200).send(rows);
        }else {
            const {rows} = await db.query('INSERT INTO settings(userid, prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)' +
            'VALUES ($1, $2, $3, $4) RETURNING *', 
            [userid, 24, 24*7, 6]);
            res.status(200).send(rows);
        }
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

async function saveUserSettings(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const pf = req.body.prompt_frequency_hrs;
    const af = req.body.analysis_frequency_hrs;
    const cl = req.body.check_limit_hrs;
    const userid = req.user[0].id;
    try {
        await db.query('START TRANSACTION;');
        const {rows} = await db.query('SELECT id FROM settings WHERE userid=$1', [userid]);
        if (rows[0] != null) {
            await db.query('DELETE FROM settings WHERE userid=$1', [userid]);
        } 
        await db.query(
            'INSERT INTO settings (userId, prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs) VALUES ($1, $2, $3, $4)', 
            [userid, pf, af, cl]
            );
        await db.query('COMMIT;');
        res.status(200).send({ msg: 'Settings successfully saved.' });
    } catch (err) {
        await db.query('ROLLBACK;')
        console.error(err);
        return res.send(err);
    }
}

module.exports  = {
    getUserSettings,
    saveUserSettings
}
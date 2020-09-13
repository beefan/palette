const db = require('./database');

async function getTagPalette(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

async function saveTag(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    const tag = req.body.tag;
    try {
        await db.query('START TRANSACTION;');
        const {rows} = await db.query('SELECT id FROM tag WHERE tag=$1', [tag]);
        const tagid = rows[0] ? rows[0].id : (await db.query('INSERT INTO tag (tag) VALUES ($1) RETURNING id', [tag])).rows[0].id;
        await db.query('INSERT INTO user_tag (userid, tagid, datetime) VALUES ($1, $2, NOW())', [userid, tagid]);
        await db.query('COMMIT;');
        res.status(200).send({ msg: 'Tag saved successfully.' });
    } catch (err) {
        console.error(err);
        await db.query('ROLLBACK;');
        return res.send(err);
    }
}

async function getUserTagsByDay(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    const date = req.body.date;

    try {
        const sql = 'SELECT tag.tag, count(tag.id) FROM user_tag ' +
                    'JOIN tag ON tag.id = user_tag.tagid ' +
                    'WHERE DATE(user_tag.datetime) = $1 ' +
                    'AND userid = $2 ' +
                    'GROUP BY tag.tag ' +
                    'ORDER BY count desc;';
        const {rows} = await db.query(sql, [date, userid]);
        res.status(200).send({ rows });
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

async function getUserTopTagsSince(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    const days = req.params.days;

    try {
        const sql = 'SELECT tag.tag, count(tag.tag) FROM user_tag ' +
                    'JOIN tag ON tag.id = user_tag.tagid ' + 
                    'WHERE user_tag.datetime > NOW() -  $1 * INTERVAL \'1 day\'' +
                    'AND userid = $2 ' + 'GROUP BY tag.tag ' + 'ORDER BY count desc ' + 'LIMIT 50;';
                    console.log(sql);
        const {rows} = await db.query(sql, [days, userid]);
        res.status(200).send({ rows });
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

async function getUserTagCousins(req, res) {
    if (req.user == null) {
        res.status(403).send({msg: 'You need to be logged in for that.'});
        return;
    }
    const userid = req.user[0].id;
    const days = req.params.tag;

    try {
        const sql = 'SELECT tag.tag, count(tag.tag) FROM user_tag ' +
                    'JOIN tag ON tag.id = user_tag.tagid ' + 
                    'WHERE user_tag.datetime > NOW() -  $1 * INTERVAL \'1 day\'' +
                    'AND userid = $2 ' + 'GROUP BY tag.tag ' + 'ORDER BY count desc ' + 'LIMIT 50;';
                    console.log(sql);
        const {rows} = await db.query(sql, [days, userid]);
        res.status(200).send({ rows });
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

module.exports  = {
    getTagPalette,
    saveTag,
    getUserTagsByDay,
    getUserTopTagsSince,
    getUserTagCousins
}
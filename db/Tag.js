const db = require('./database');

async function getTagPalette(req, res) {
    if (req.user == null) {
        res.status(403).send({ msg: 'You need to be logged in for that.' });
        return;
    }
    const userid = req.user[0].id;
    try {
        // Needs to be smarter at predicting users desired tags for value-add 
        // Now returns top tags for last 3 months.
        const sql = 'SELECT tag.tag, count(tag.tag) FROM user_tag ' +
            'JOIN tag ON tag.id = user_tag.tagid ' +
            'WHERE user_tag.datetime > NOW() - INTERVAL \'3 months\' ' +
            'AND userid = $1 ' + 'GROUP BY tag.tag ' +
            'ORDER BY count desc ' + 'LIMIT 50;'
        const { rows } = await db.query(sql, [userid]);
        res.status(200).send(rows);
    } catch (err) {
        return res.send(err);
    }
}

async function saveTag(req, res) {
    if (req.user == null) {
        res.status(403).send({ msg: 'You need to be logged in for that.' });
        return;
    }
    const userid = req.user[0].id;
    const tag = req.body.tag;
    try {
        await db.query('START TRANSACTION;');
        const { rows } = await db.query('SELECT id FROM tag WHERE tag=$1', [tag]);
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
        res.status(403).send({ msg: 'You need to be logged in for that.' });
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
        const { rows } = await db.query(sql, [date, userid]);
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

async function getUserTopTagsSince(req, res) {
    if (req.user == null) {
        res.status(403).send({ msg: 'You need to be logged in for that.' });
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
        const { rows } = await db.query(sql, [days, userid]);
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

async function getUserTagCousins(req, res) {
    if (req.user == null) {
        res.status(403).send({ msg: 'You need to be logged in for that.' });
        return;
    }
    const userid = req.user[0].id;
    const tag = req.params.tag;
    const num = req.params.num;

    try {
        // if its not second cousin, we search first by default
        const sql = (num != 2) ?
            'select tag.tag, count(tag.tag) FROM user_tag ' +
            'JOIN tag ON tag.id = user_tag.tagid ' +
            'WHERE DATE(user_tag.datetime) ' +
            'IN ( SELECT DATE(user_tag.datetime) ' +
            'FROM user_tag ' +
            'JOIN tag on tag.id = user_tag.tagid ' +
            'WHERE tag.tag = $1 ' +
            'AND user_tag.userid = $2 ) ' +
            'AND tag.tag != $1 ' +
            'AND user_tag.userid = $2 ' +
            'GROUP BY tag.tag ' +
            'ORDER BY count desc;'
            :
            // query for second cousins
            'SELECT tag.tag, count(tag.tag) FROM user_tag ' +
            'JOIN tag ON tag.id = user_tag.tagid ' +
            'WHERE DATE(user_tag.datetime) ' +
            'IN ( SELECT DATE(user_tag.datetime) FROM user_tag ' +
            'JOIN tag ON tag.id = user_tag.tagid ' +
            'WHERE tag.tag ' +
            'IN (select tag.tag FROM user_tag ' +
            'JOIN tag ON tag.id = user_tag.tagid ' +
            'WHERE DATE(user_tag.datetime) ' +
            'IN ( SELECT DATE(user_tag.datetime) ' +
            'FROM user_tag ' +
            'JOIN tag on tag.id = user_tag.tagid ' +
            'WHERE tag.tag = $1 ' +
            'AND user_tag.userid = $2 ) ' +
            'AND tag.tag != $1 ' +
            'AND user_tag.userid = $2 ' +
            'GROUP BY tag.tag ) ' +
            'AND user_tag.userid = $2 ' +
            'GROUP BY DATE(user_tag.datetime) ' +
            ') ' +
            'AND user_tag.userid = $2 ' +
            'GROUP BY tag.tag ' +
            'ORDER BY count desc;'
        const { rows } = await db.query(sql, [tag, userid]);
        res.status(200).send(rows);
    } catch (err) {
        console.error(err);
        return res.send(err);
    }
}

module.exports = {
    getTagPalette,
    saveTag,
    getUserTagsByDay,
    getUserTopTagsSince,
    getUserTagCousins
}
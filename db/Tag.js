const db = require('./database');

async function getTagPalette(req, res) {
    const userId = parseInt(req.params.userId)
    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

async function saveTag(req, res) {
    const userId = parseInt(req.params.userId)
    const tag = req.params.tag

    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

async function getUserTagsByDay(req, res) {
    const userId = parseInt(req.params.userId)
    const date = req.params.date

    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

async function getUserTopTagsSince(req, res) {
    const userId = parseInt(req.params.userId)
    const date = req.params.date

    try {
        const sql = 'SELECT * FROM tag' // to be changed
        const {rows} = await db.query(sql);
        res.status(200).send({ rows });
    } catch (err) {
        return res.send(err);
    }
}

module.exports  = {
    getTagPalette,
    saveTag,
    getUserTagsByDay,
    getUserTopTagsSince
}
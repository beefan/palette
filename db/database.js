const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

function query(sql, values) {
    return new Promise( (resolve, reject) => {
        pool
        .query(sql, values)
        .then((res) => {
            console.log('resolve');
            resolve(res);
        })
        .catch((err) => {
            console.log('reject');
            reject(err);
        });
    });
}

module.exports = { query };
const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'coindata',
    password: 'password123',
    port: 5432
})

function query(sql) {
    return new Promise( (resolve, reject) => {
        pool
        .query(sql)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = { query };
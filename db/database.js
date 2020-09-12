const { response } = require('express')

const Pool = require('pg').Pool

/**
 * IMPROVE SECURITY ON DB & EXPORT CREDENTIALS
 * BEFORE PUSHING TO PRODUCTION
 */
const pool = new Pool({
    user: 'brandonfannin',
    host: 'localhost',
    database: 'palette',
    password: '',
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
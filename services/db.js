const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection(config.db);
        const [resutls, _] = await connection.execute(sql, params);

        return resutls;
    } catch (err) {
        console.log(err)
        return err;
    }
}

module.exports = {
    query
};
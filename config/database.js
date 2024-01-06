const mysql = require('mysql')
const config = require('../config')

const db = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port
})

// open the MySQL connection
db.connect(error => {
    if (error) console.error(error.stack);
    console.log("Berhasil terhubung dengan database.");
});

module.exports = db
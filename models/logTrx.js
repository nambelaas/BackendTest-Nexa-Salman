const db = require('../config/database')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// constructor
const LogTrx = function (data) {
    this.user_id = data.user_id;
    this.api = data.api;
    this.request = data.request;
    this.response = data.response;
    this.insert_at = data.insert_at;
};

LogTrx.create = (form, result) => {
    var insertQuery = `INSERT INTO log_trx_api SET ?`

    console.log(insertQuery)
    console.log(form)

    db.query(insertQuery, form, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    })
}

module.exports = LogTrx
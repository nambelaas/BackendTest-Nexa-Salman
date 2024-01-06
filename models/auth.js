const db = require('../config/database')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// constructor
const Auth = function (data) {
    this.username = data.username;
    this.password = data.password;
};

Auth.create = (form, result) => {
    var queryCheck = `SELECT * FROM admin WHERE username = '${form.username}' LIMIT 1`

    console.log(queryCheck)

    db.query(queryCheck, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(form.password)
            if (bcrypt.compareSync(form.password.toString(), res[0].password.toString()) == true) {
                console.log("halo")
                var tokenExpiry = 1

                const todayDate = new Date()
                console.log(todayDate)
                todayDate.setHours(todayDate.getHours()+tokenExpiry)
                console.log(todayDate)

                var expiredDate = todayDate

                var tokenJwt = jwt.sign({ userId: res[0].id }, process.env.PASSWORD_KEY, {
                    algorithm: "HS256",
                    expiresIn: `${tokenExpiry}h`,
                });
                console.log(tokenJwt)

                var insertData = {
                    id_admin: res[0].id,
                    token: tokenJwt,
                    expired_at: expiredDate
                }

                db.query("INSERT INTO admin_token SET ?", insertData, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    
                });
                result(null, {
                    status: 200,
                    message: "Login berhasil dilakukan",
                    data: {
                        uid: res[0].id,
                        token: tokenJwt
                    }
                });

            }
        } else {
            result(null, {
                status: 400,
                message: "data tidak ditemukan",
                data: null
            });
            return;
        }
    })
};

module.exports = Auth
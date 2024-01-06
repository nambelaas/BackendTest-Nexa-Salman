const Auth = require("../models/auth");


// Login
exports.login = (req, res, next) => {
    // Validate request
    if (req.body) {
        if (!req.body.username) {
            res.status(400).send({
                message: "Username tidak boleh kosong!"
            });
        } else if (!req.body.password) {
            res.status(400).send({
                message: "Password tidak boleh kosong!"
            });
        }
    }

    const authData = new Auth({
        username: req.body.username,
        password: req.body.password
    });
    console.log(authData)

    Auth.create(authData, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Terjadi error saat membuat admin token"
            });

        res.result = JSON.stringify(data)
        res.json(data)
        next()
    });
};
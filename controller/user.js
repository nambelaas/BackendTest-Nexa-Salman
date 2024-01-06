const User = require("../models/user");
const generateUuid = require('generate-unique-id')

// Login
exports.add = (req, res, next) => {
    // Validate request
    if (req.body) {
        if (!req.body.nama) {
            res.status(400).send({
                status: 400,
                message: "Nama tidak boleh kosong!"
            });
        } else if (!req.body.alamat) {
            res.status(400).send({
                status: 400,
                message: "Alamat tidak boleh kosong!"
            });
        } else if (!req.body.gend) {
            res.status(400).send({
                status: 400,
                message: "Gend tidak boleh kosong!"
            });
        } else if (!req.body.photo) {
            res.status(400).send({
                status: 400,
                message: "Photo tidak boleh kosong!"
            });
        } else if (!req.body.tgl_lahir) {
            res.status(400).send({
                status: 400,
                message: "Tgl_lahir tidak boleh kosong!"
            });
        } else if (!req.body.status) {
            res.status(400).send({
                status: 400,
                message: "Status tidak boleh kosong!"
            });
        }
    }

    var currentDate = new Date()
    var tglLahir = new Date(req.body.tgl_lahir)
    var nip = new Date().getFullYear() + generateUuid({
        length: 7,
        useNumbers: true,
        useLetters: false,
        excludeSymbols: true
    })
    console.log(nip)
    console.log("User Id: " + req.userId)

    User.findBy({ nip: nip }, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Terjadi error saat melakukan cek data"
            });

        console.log(data)
        console.log(this.nip)
        if (data.length == 0) {
            const userData = new User({
                nip: nip,
                nama: req.body.nama,
                alamat: req.body.alamat,
                gend: req.body.gend,
                photo: req.body.photo,
                tgl_lahir: tglLahir,
                status: req.body.status,
                insert_at: currentDate,
                insert_by: req.userId,
            });
            console.log(userData)

            User.create(userData, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Terjadi error saat menambahkan data"
                    });

                res.result = JSON.stringify(data)
                res.json(data)
                next()
            });
        } else {
            var nip = new Date().getFullYear() + generateUuid({
                length: 7,
                useNumbers: true,
                useLetters: false,
                excludeSymbols: true
            })
            console.log(nip)

            const userData = new User({
                nip: nip,
                nama: req.body.nama,
                alamat: req.body.alamat,
                gend: req.body.gend,
                photo: req.body.photo,
                tgl_lahir: tglLahir,
                status: req.body.status,
                insert_at: currentDate,
                insert_by: req.userId,
            });
            console.log(userData)

            User.create(userData, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Terjadi error saat menambahkan data"
                    });

                res.result = JSON.stringify(data)
                res.json(data)
                next()
            });
        }
    })
};

exports.list = (req, res, next) => {
    // Validate request
    if (req.query) {
        if (!req.query.keyword) {
            res.status(400).send({
                message: "Keyword tidak boleh kosong!"
            });
        } else if (!req.query.start) {
            res.status(400).send({
                message: "Start tidak boleh kosong!"
            });
        } else if (!req.query.count) {
            res.status(400).send({
                message: "Count tidak boleh kosong!"
            });
        }
    }

    var searchParam = {
        keyword: req.query.keyword,
        start: req.query.start,
        count: req.query.count,
    }

    User.list(searchParam, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Terjadi error saat mencari data"
            });

        res.result = JSON.stringify(data)
        res.json(data)
        next()
    });
};

exports.update = (req, res, next) => {
    // Validate request
    if (req.params) {
        if (!req.params.nip) {
            res.status(400).send({
                message: "Nip tidak boleh kosong!"
            });
        }
    }
    var currentDate = new Date()
    var tglLahir = new Date(req.body.tgl_lahir)
    const userData = {};

    if (req.body.nama) {
        userData.nama = req.body.nama
    }
    if (req.body.alamat) {
        userData.alamat = req.body.alamat
    }
    if (req.body.gend) {
        userData.gend = req.body.gend
    }
    if (req.body.photo) {
        userData.photo = req.body.photo
    }
    if (req.body.tgl_lahir) {
        userData.tgl_lahir = tglLahir
    }
    if (req.body.status) {
        userData.status = req.body.status
    }

    if (Object.keys(userData).length > 0) {
        userData.update_at = currentDate
        userData.update_by = req.userId
    }

    User.update(req.params.nip, userData, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Terjadi error saat mencari data"
            });

        res.result = JSON.stringify(data)
        res.json(data)
        next()
    });
};

exports.disable = (req, res, next) => {
    // Validate request
    if (req.params) {
        if (!req.params.nip) {
            res.status(400).send({
                message: "Nip tidak boleh kosong!"
            });
        }
    }

    var currentDate = new Date()
    const userData = {
        status: 9,
        update_at: currentDate,
        update_by: req.userId,
    };

    console.log(req.params)
    User.disable(req.params.nip, userData, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Terjadi error saat mencari data"
            });

        res.result = JSON.stringify(data)
        res.json(data)
        next()
    });
};
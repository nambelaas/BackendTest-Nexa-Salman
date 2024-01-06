const db = require('../config/database')

const User = function (data) {
    this.nip = data.nip;
    this.nama = data.nama;
    this.alamat = data.alamat;
    this.gend = data.gend;
    this.photo = data.photo;
    this.tgl_lahir = data.tgl_lahir;
    this.status = data.status;
    this.insert_at = data.insert_at;
    this.insert_by = data.insert_by;
};

User.create = (form, result) => {
    var insertQuery = `INSERT INTO karyawan SET ?`

    console.log(insertQuery)
    console.log(form)

    db.query(insertQuery, form, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, {
                message: "Gagal menambahkan data karyawan"
            });
            return;
        }

        result(null, {
            status: 200,
            message: "Berhasil menambahkan data karyawan"
        })
    })
};

User.list = (form, result) => {
    var initIndex = form.start - 1
    var offset = initIndex * form.count
    var listQuery = `SELECT * FROM karyawan WHERE nama LIKE '%${form.keyword}%' LIMIT ${offset}, ${form.count}`

    console.log(listQuery)
    console.log(form)

    db.query(listQuery, form, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, {
                message: "Gagal mendapatkan data karyawan"
            });
            return;
        }

        console.log(res)
        result(null, {
            status: 200,
            message: "Berhasil mendapatkan data karyawan",
            data: {
                ...res
            }
        })
    })
};

User.findBy = (cond, result) => {
    var findQuery = `SELECT * FROM karyawan WHERE ?`

    console.log(findQuery)

    db.query(findQuery, cond, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, {
            nip: cond.nip,
            ...res
        })
    })
}

User.update = (param, form, result) => {
    var updateQuery = `UPDATE karyawan SET ? WHERE nip = ${param};`

    console.log(updateQuery)
    console.log(form)

    db.query(updateQuery, form, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, {
                message: "Gagal update data karyawan"
            });
            return;
        }

        result(null, {
            status: 200,
            message: "Berhasil update data karyawan " + param
        })
    })
}

User.disable = (param, form, result) => {
    var disableQuery = `UPDATE karyawan SET ? WHERE nip = ${param};`

    console.log(disableQuery)

    db.query(disableQuery, form, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, {
                message: "Gagal menonaktifkan data karyawan"
            });
            return;
        }

        result(null, {
            status: 200,
            message: "Berhasil menonaktifkan data karyawan " + param
        })
    })
}
module.exports = User
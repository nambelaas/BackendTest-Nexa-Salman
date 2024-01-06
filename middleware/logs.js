const LogTrx = require("../models/logTrx");

const logRequest = (req, res, next) => {
    console.log(`Terjadi Request pada path ${req.path}`)
    console.log(`Hasil Request ${res.result}`)

    var resultParse = JSON.parse(res.result)

    const logData = new LogTrx({
        user_id: resultParse.data?.uid ?? req.userId,
        api: req.path,
        request: JSON.stringify(req.body),
        response: res.result,
        insert_at: new Date()
    });

    LogTrx.create(logData, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Terjadi error saat menambahkan data"
            });
        console.log(data)
    });

    next()
}

module.exports = logRequest



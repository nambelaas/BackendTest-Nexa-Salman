const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const apiRouter = require('./routes/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


console.log(`Your port is ${process.env.APP_PORT}`)
app.use('/api', apiRouter)



app.listen(process.env.APP_PORT)

const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken(req, res, next) {
        let tokenHeader = req.headers['authorization'];

        if (tokenHeader.split(' ')[0] !== 'Bearer') {
            return res.status(500).send({
                auth: false,
                message: "Error",
                errors: "Incorrect token format"
            });
        }

        let token = tokenHeader.split(' ')[1];

        if (!token) {
            return res.status(403).send({
                auth: false,
                message: "Error",
                errors: "No token provided"
            });
        }

        jwt.verify(token, process.env.PASSWORD_KEY, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Error",
                    errors: err.message
                });
            }

            req.userId = decoded.userId;
        });
        next();
    },
}
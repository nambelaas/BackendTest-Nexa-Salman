const env = process.env;
// setup database
const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.HOST_DB || 'localhost',
        user: env.USERNAME_DB || 'root',
        password: env.PASSWORD_DB || 'root',
        database: env.DB_NAME || 'simpleApi',
        port: env.PORT_DB || '3306',
        tokenExpiredHour: env.TOKEN_EXPIRED_HOUR || '1',
    },
    listPerPage: env.LIST_PER_PAGE || 10,
}

module.exports = config;
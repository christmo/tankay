'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || 'mongodb://tankay:tankaypass@ds057234.mongolab.com:57234/mean_dev',
    db_mysql: {
        name: 'tankay',
        password: 'root',
        username: 'root',
        host: 'localhost',
        port: 8889
    },
    db_postgres: {
        name: 'tankay',
        username: 'postgres',
        password: 'christmo',
        host: 'localhost',
        port: 5432,
        ssl:true
    },
    db_dialect:'postgres',
    debug: true,
    logging: {
        format: 'tiny'
    },
    //  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
    aggregate: false,
    mongoose: {
        debug: false
    },
    hostname: 'http://localhost:3000',
    app: {
        name: 'MEAN - A Modern Stack - Development'
    },
    strategies: {
        local: {
            enabled: true
        },
        landingPage: '/'
    },
    emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
    mailer: {
        service: 'SERVICE_PROVIDER', // Gmail, SMTP
        auth: {
            user: 'EMAIL_ID',
            pass: 'PASSWORD'
        }
    },
    secret: 'SOME_TOKEN_SECRET'
};

'use strict';

module.exports = {
    db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
    db_app: {
        name: 'tankay',
        password: 'root',
        username: 'root',
        host: 'localhost',
        port: 8889
    },
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

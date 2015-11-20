'use strict';

module.exports = {
    db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-test',
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
        port: 5432
    },
    db_dialect:'postgres',
    http: {
        port: 3001
    },
    aggregate: false,
    assets: {
        hash: false
    },
    logging: {
        format: 'common'
    },
    app: {
        name: 'MEAN - A Modern Stack - Test'
    },
    strategies: {
        local: {
            enabled: true
        },
        landingPage: '/'
    },
    emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
    mailer: {
        service: 'SERVICE_PROVIDER',
        auth: {
            user: 'EMAIL_ID',
            pass: 'PASSWORD'
        }
    },
    secret: 'SOME_TOKEN_SECRET'
};

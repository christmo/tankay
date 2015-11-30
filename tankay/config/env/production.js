'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL || 'mongodb://tankay:tankaypass@ds057234.mongolab.com:57234/mean_prod',
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
        ssl:false
    },
    db_dialect:'postgres',
    /**
     * Database options that will be passed directly to mongoose.connect
     * Below are some examples.
     * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
     * and http://mongoosejs.com/docs/connections.html for more information
     */
    dbOptions: {
        /*
         server: {
         socketOptions: {
         keepAlive: 1
         },
         poolSize: 5
         },
         replset: {
         rs_name: 'myReplicaSet',
         poolSize: 5
         },
         db: {
         w: 1,
         numberOfRetries: 2
         }
         */
    },
    hostname: 'http://localhost:3000',
    app: {
        name: 'MEAN - A Modern Stack - Production'
    },
    logging: {
        format: 'combined'
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

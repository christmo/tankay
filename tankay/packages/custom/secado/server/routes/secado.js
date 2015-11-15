'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function (Secado, app, auth, database) {


    var secado = require('../controllers/SecadoController')(Secado);

    app.post('/api/secado/step-3/save', secado.save);
    app.get('/api/secado/step-3/:lote', secado.get);

    app.get('/api/secado/step-3/save', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/api/secado/example/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/api/secado/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/api/secado/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/api/secado/example/render', function (req, res, next) {
        Secado.render('index', {
            package: 'secado'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};

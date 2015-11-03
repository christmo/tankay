'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function (Almacenado, app, auth, database) {

    var almacenado = require('../controllers/AlmacenadoController')(Almacenado);

    app.post('/api/almacenado/step-5/save', almacenado.save);

    app.get('/api/almacenado/example/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/api/almacenado/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/api/almacenado/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/api/almacenado/example/render', function (req, res, next) {
        Almacenado.render('index', {
            package: 'almacenado'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};

'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function (Empacado, app, auth, database) {


    var empacado = require('../controllers/EmpacadoController')(Empacado);

    app.post('/api/empacado/step-4/save', empacado.save);
    app.get('/api/empacado/step-4/:lote', empacado.get);

    app.get('/api/empacado/example/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/api/empacado/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/api/empacado/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/api/empacado/example/render', function (req, res, next) {
        Empacado.render('index', {
            package: 'empacado'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};

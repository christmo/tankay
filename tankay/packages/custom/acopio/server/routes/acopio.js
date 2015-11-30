'use strict';



/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function (Acopio1, app, auth, database) {

    var acopio = require('../controllers/AcopioController')(Acopio1);

    app.post('/api/acopio/step-1/save',acopio.save);
    app.get('/api/acopio/step-1/:lote',acopio.get);
    app.post('/api/acopio/step-1/all',acopio.queryAll);

    app.get('/api/acopio1/example/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/api/acopio1/example/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/api/acopio1/example/render', function (req, res, next) {
        Acopio1.render('index', {
            package: 'acopio-1'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};

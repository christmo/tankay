'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Almacenado5, app, auth, database) {

  app.get('/api/almacenado5/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/almacenado5/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/almacenado5/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/almacenado5/example/render', function(req, res, next) {
    Almacenado5.render('index', {
      package: 'almacenado-5'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

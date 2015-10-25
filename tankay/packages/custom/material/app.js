'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Material = new Module('material');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Material.register(function (app, auth, database) {
    app.set('views', __dirname + '/server/views');

    //We enable routing. By default the Package Object is passed to the routes
    Material.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Material.menus.add({
        title: 'material example page',
        link: 'material example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    Material.aggregateAsset('js', '../lib/angular-ui-route/release/angular-ui-router.min.js');
    Material.aggregateAsset('js', '../lib/angular-route/angular-route.js');
    Material.aggregateAsset('js', '../lib/angular-animate/angular-animate.js');
    Material.aggregateAsset('js', '../lib/angular-loading-bar/src/loading-bar.js');
    Material.aggregateAsset('js', '../lib/oclazyload/dist/ocLazyLoad.min.js');
    Material.aggregateAsset('js', '../lib/angular-bootstrap/ui-bootstrap-tpls.min.js');
    Material.aggregateAsset('js', '../lib/bootstrap-growl/bootstrap-growl.min.js');
    Material.aggregateAsset('js', '../lib/ng-table/dist/ng-table.min.js');
    Material.aggregateAsset('js', '../lib/angular-nouislider/src/nouislider.min.js');
    Material.aggregateAsset('js', '../lib/sparklines/jquery.sparkline.min.js');
    Material.aggregateAsset('js', '../lib/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js');
    Material.aggregateAsset('js', '../lib/simpleWeather/jquery.simpleWeather.min.js');
    Material.aggregateAsset('css', '../lib/animate.css/animate.min.css');
    Material.aggregateAsset('css', '../lib/material-design-iconic-font/dist/css/material-design-iconic-font.min.css');
    Material.aggregateAsset('css', '../lib/fullcalendar/dist/fullcalendar.min.css');
    Material.aggregateAsset('css', 'app.min.1.css',{global:true,  weight: 10, group: 'header'});
    Material.aggregateAsset('css', 'app.min.2.css',{global:true,  weight: 11, group: 'header'});
    //Material.aggregateAsset('css', 'demo.css',{global:true,  weight: 12, group: 'header'});

    Material.angularDependencies(['ngRoute','ui.router',
        'ngAnimate','ngResource','ui.bootstrap', 'ngTable',
        'angular-loading-bar','oc.lazyLoad', 'nouislider']);

    Material.aggregateAsset('css', 'material.css');


    return Material;
});

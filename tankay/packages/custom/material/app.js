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
    /*Material.menus.add({
        title: 'material design theme',
        link: 'material',
        roles: ['authenticated'],
        menu: 'main'
    });*/

    Material.aggregateAsset('js', '../lib/angular-ui-router/release/angular-ui-router.min.js');
    Material.aggregateAsset('js', '../lib/angular-route/angular-route.min.js');
    Material.aggregateAsset('js', '../lib/angular-animate/angular-animate.min.js',{weight:6});
    Material.aggregateAsset('js', '../lib/angular-aria/angular-aria.min.js');
    Material.aggregateAsset('js', '../lib/angular-material/angular-material.min.js');
    Material.aggregateAsset('js', '../lib/angular-loading-bar/src/loading-bar.js');
    Material.aggregateAsset('js', '../lib/oclazyload/dist/ocLazyLoad.min.js');
    Material.aggregateAsset('js', '../lib/angular-bootstrap/ui-bootstrap-tpls.min.js');
    Material.aggregateAsset('js', '../lib/bootstrap-growl/bootstrap-growl.min.js');
    //Material.aggregateAsset('js', '../lib/ng-table/dist/ng-table.min.js');
    Material.aggregateAsset('js', '../lib/ng-table/dist/ng-table.js');
    Material.aggregateAsset('js', '../lib/angular-nouislider/src/nouislider.min.js');
    Material.aggregateAsset('js', '../lib/sparklines/jquery.sparkline.min.js');
    Material.aggregateAsset('js', '../lib/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js');
    Material.aggregateAsset('js', '../lib/simpleWeather/jquery.simpleWeather.min.js');
    Material.aggregateAsset('js', '../lib/autosize/dist/autosize.min.js');
    Material.aggregateAsset('js', '../lib/sweetalert/dist/sweetalert.min.js');
    Material.aggregateAsset('js', '../lib/moment/min/moment.min.js');
    Material.aggregateAsset('js', '../lib/pickadate/lib/compressed/picker.js');
    Material.aggregateAsset('js', '../lib/pickadate/lib/compressed/picker.time.js');
    //Material.aggregateAsset('js', '../lib/sc-date-time/dist/sc-date-time.js');
    Material.aggregateAsset('js', '../lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',{weight: 5});

    Material.aggregateAsset('css', '../lib/angular-material/angular-material.min.css',{weight: -1});
    Material.aggregateAsset('css', '../lib/animate.css/animate.min.css');
    Material.aggregateAsset('css', '../lib/sc-date-time/dist/sc-date-time.css');
    Material.aggregateAsset('css', '../lib/sweetalert/dist/sweetalert.css',{weight: 13});
    Material.aggregateAsset('css', '../lib/material-design-iconic-font/dist/css/material-design-iconic-font.min.css');
    Material.aggregateAsset('css', '../lib/pickadate/lib/compressed/themes/default.css');
    Material.aggregateAsset('css', '../lib/pickadate/lib/compressed/themes/default.time.css');
   // Material.aggregateAsset('css', '../lib/fullcalendar/dist/fullcalendar.min.css');
    Material.aggregateAsset('css', '../lib/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',{global:true,  weight: 14, group: 'header'});
    Material.aggregateAsset('css', 'app.min.1.css',{global:true,  weight: 10, group: 'header'});
    Material.aggregateAsset('css', 'app.min.2.css',{global:true,  weight: 11, group: 'header'});
    Material.aggregateAsset('css', 'material.css',{weight: 16});

    Material.angularDependencies(['ngRoute','ui.router',
        'ngAnimate','ngResource','ui.bootstrap', 'ngTable',
        'angular-loading-bar','oc.lazyLoad', 'nouislider',
        'ngClipboard','ngMaterial']);


    return Material;
});

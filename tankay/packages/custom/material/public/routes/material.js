'use strict';

angular.module('mean.material')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');


            $stateProvider

                //------------------------------
                // HOME
                //------------------------------

                .state('home', {
                    url: '/',
                    templateUrl: 'material/views/home.html',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    name: 'css',
                                    insertBefore: '#app-level',
                                    files: [
                                        '/material/assets/lib/fullcalendar/dist/fullcalendar.min.css',
                                    ]
                                },
                                {
                                    name: 'vendors',
                                    insertBefore: '#app-level-js',
                                    files: [
                                        '/material/assets/lib/sparklines/jquery.sparkline.min.js',
                                        '/material/assets/lib/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                        '/material/assets/lib/simpleWeather/jquery.simpleWeather.min.js'//,
                                        //'/material/assets//lib/moment/min/moment.min.js',
                                        //'/material/assets/lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
                                    ]
                                }
                            ])
                        }
                    }
                });
        }
    ]);

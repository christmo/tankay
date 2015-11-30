'use strict';

/* jshint -W098 */
angular.module('mean.material')

    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('materialadminCtrl', ['$timeout','$state','growlService','$location',
        function ($timeout, $state, growlService,$location) {
            //Welcome Message
            growlService.growl('Bienvenido!', 'inverse');

            // Detact Mobile Browser
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                angular.element('html').addClass('ismobile');
            }

            // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
            this.sidebarToggle = {
                left: false,
                right: false
            };

            // By default template has a boxed layout
            this.layoutType = localStorage.getItem('ma-layout-status');

            // For Mainmenu Active Class
            this.$state = $state;

            //Close sidebar on click
            this.sidebarStat = function (event) {
                if (!angular.element(event.target).parent().hasClass('active')) {
                    this.sidebarToggle.left = false;
                }
            };

            $location.path('/home');
        }
    ])
;

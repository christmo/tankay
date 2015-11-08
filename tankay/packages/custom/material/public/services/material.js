'use strict';

angular.module('mean.material')
    .factory('Material', [
        function () {
            return {
                name: 'material'
            };
        }
    ])
    .service('errorMessage', [
        function () {
            return {
                show: function (show,msg) {
                    if (show) {
                        swal({
                            title: 'Error!!!',
                            text: msg,
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#F44336',
                            confirmButtonText: 'Aceptar',
                            closeOnConfirm: true
                        });
                    }
                }
            }
        }
    ])
    .service('categories', [
        function () {
            return {
                get: function () {
                    var categories = [
                        {id:1,label:'Categoría I'},
                        {id:2,label:'Categoría II'},
                        {id:3,label:'Categoría III'},
                        {id:4,label:'Categoría IV'}
                    ];
                    return categories;
                }
            }
        }
    ]);


// =========================================================================
// Header Messages and Notifications list Data
// =========================================================================

angular.module('mean.material')
    .service('messageService', ['$resource', function ($resource) {
        this.getMessage = function (img, user, text) {
            var gmList = $resource('material/data/messages-notifications.json');

            return gmList.get({
                img: img,
                user: user,
                text: text
            });
        }
    }])


    // =========================================================================
    // Nice Scroll - Custom Scroll bars
    // =========================================================================
    .service('nicescrollService', function () {
        var ns = {};
        ns.niceScroll = function (selector, color, cursorWidth) {

            $(selector).niceScroll({
                cursorcolor: color,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorwidth: cursorWidth,
                bouncescroll: true,
                mousescrollstep: 100,
                autohidemode: false
            });
        }

        return ns;
    })


    //==============================================
    // BOOTSTRAP GROWL
    //==============================================

    .service('growlService', function () {
        var gs = {};
        gs.growl = function (message, type) {
            $.growl({
                message: message
            }, {
                type: type,
                allow_dismiss: false,
                label: 'Cancel',
                className: 'btn-xs btn-inverse',
                placement: {
                    from: 'top',
                    align: 'right'
                },
                delay: 2500,
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                offset: {
                    x: 20,
                    y: 85
                }
            });
        }

        return gs;
    });

'use strict';

angular.module('mean.material')
    .service('errorMessage', [
        function () {
            return {
                show: function (show, msg) {
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
                        {id: 1, label: 'Categoría I'},
                        {id: 2, label: 'Categoría II'},
                        {id: 3, label: 'Categoría III'},
                        {id: 4, label: 'Categoría IV'}
                    ];
                    return categories;
                }
            }
        }
    ])
    .service('updateBar', [
        function () {
            return {
                progress: function (max, meta, min, bar) {
                    var type;
                    bar.max = max;
                    var meta = meta;
                    var lim_low = min;

                    var value = (bar.read * 100) / max;
                    if (value >= (meta * 100) / max) {
                        type = 'success';
                    }
                    else if (value > (lim_low * 100) / max && value < (meta * 100) / max) {
                        type = 'warning';
                    }
                    else {
                        type = 'danger';
                    }

                    bar.showWarning = (type === 'danger' || type === 'warning');

                    bar.dynamic = value;
                    bar.type = type;
                    return bar;
                }
            }
        }
    ])
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
        };

        return gs;
    });

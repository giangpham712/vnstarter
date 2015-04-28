(function () {
    'use strict'
    App.directive('ngAutoNumeric', function ($parse) {

        var options = {
            currency: {aSep: ".", aDec: ",", mDec: 0, lZero: "deny", pSign: "s", aSign: " vnđ", vMax: "1000000000"},
            days: {aSep: ".", aDec: ",", mDec: 0, lZero: "deny", vMin: "0", vMax: "90"}
        };

        return {
            restrict: 'A',
            require: '^ngModel',
            link: function (scope, element, attrs, controller) {

                var updateElement = function (element, newVal) {
                    element.autoNumeric('set', newVal);
                    var model = $parse(attrs.ngModel);
                    model.assign(scope, element.autoNumeric('get'));
                };

                var format = attrs.ngAutoNumeric;

                element.autoNumeric('init', options[format])

                scope.$watch(attrs.ngModel, function (value) {
                    controller.$render();
                });

                controller.$render = function () {
                    updateElement(element, controller.$viewValue);
                }
            }
        }
    });
})();
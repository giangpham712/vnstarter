App.directive('ngDatetimePicker', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        template: "<div><input type=\"text\" readonly=\"readonly\" /><div class=\"datetimepicker\"><div/></div>",
        link: function (scope, element, attrs) {

            var attributes, defaultDate, dateFormat, input, resetValue;
            dateFormat = "";
            defaultDate = scope.$eval(attrs.ngModel);

            input = element.find("input");
            attributes = element.prop("attributes");
            resetValue = false;

            angular.forEach(attributes, function(e) {
                if (e.name === "date-format") {
                    return dateFormat = e.value;
                }
            });

            var picker = element.children("div").datetimepicker({
                inline: true,
                locale: "vi",
                format: dateFormat
            })

            picker.data("DateTimePicker").date(defaultDate);
            input.val(picker.data("DateTimePicker").date().format(dateFormat));

            picker.on("dp.change", function(e) {
                return scope.$apply(function() {
                    var i, obj, objPath, path, _i, _len, _results;
                    if (!e.date) return;

                    objPath = attrs.ngModel.split(".");
                    obj = scope;
                    _results = [];
                    for (i = _i = 0, _len = objPath.length; _i < _len; i = ++_i) {
                        path = objPath[i];
                        if (!obj[path]) {
                            obj[path] = {};
                        }
                        if (i === objPath.length - 1) {
                            if (resetValue) {
                                resetValue = false;
                                _results.push(obj[path] = null);
                            } else {
                                _results.push(obj[path] = e.date.format(dateFormat));
                                input.val(e.date.format(dateFormat));
                                scope.$emit('setFormDirty');
                            }
                        } else {
                            _results.push(obj = obj[path]);
                        }
                    }
                    return _results;
                });
            });
            scope.$watch(attrs.ngModel, function(newValue, oldValue) {

                if (oldValue && !newValue) {
                    return resetValue = true;
                }
            });
        }
    };
});
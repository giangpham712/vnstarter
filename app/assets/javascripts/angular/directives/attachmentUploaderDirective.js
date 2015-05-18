(function () {
    'use strict'
    App.directive('ngAttachmentUploader', ['fileUploader', function(fileUploader) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                chooseFileButtonText: '@',
                uploadFileButtonText: '@',
                elementCssClass: '@',
                uploadUrl: '@',
                name: '@',
                defaultImageUrl: '=',
                maxFiles: '@',
                maxFileSizeMb: '@',
                autoUpload: '@',
                getAdditionalData: '&',
                onProgress: '&',
                onDone: '&',
                onError: '&'
            },
            templateUrl: 'attachmentUploader.html',
            compile: function compile(tElement, tAttrs, transclude) {
                var fileInput = angular.element(tElement.find('input[type=file]')[0]);

                if (!tAttrs.maxFiles) {
                    tAttrs.maxFiles = 1;
                    fileInput.removeAttr("multiple")
                } else {
                    fileInput.attr("multiple", "multiple");
                }

                if (!tAttrs.maxFileSizeMb) {
                    tAttrs.maxFileSizeMb = 50;
                }

                return function postLink(scope, el, attrs, ctl) {
                    scope.files = [];
                    scope.names = [];
                    scope.showUploadButton = false;

                    scope.uploadStatus = "";
                    scope.progress = 0;

                    el.bind('change', function(e) {
                        if (!e.target.files.length) return;

                        scope.files = [];
                        var tooBig = [];
                        if (e.target.files.length > scope.maxFiles) {
                            raiseError(e.target.files, 'TOO_MANY_FILES', "Cannot upload " + e.target.files.length + " files, maxium allowed is " + scope.maxFiles);
                            return;
                        }

                        for (var i = 0; i < scope.maxFiles; i++) {
                            if (i >= e.target.files.length) break;

                            var file = e.target.files[i];
                            scope.names.push(scope.name);
                            scope.files.push(file);

                            if (file.size > scope.maxFileSizeMb * 1048576) {
                                tooBig.push(file);
                            }
                        }

                        if (tooBig.length > 0) {
                            raiseError(tooBig, 'MAX_SIZE_EXCEEDED', "Files are larger than the specified max (" + scope.maxFileSizeMb + "MB)");
                            return;
                        }

                        if (scope.autoUpload && scope.autoUpload.toLowerCase() == 'true') {
                            scope.upload();
                        } else {
                            scope.$apply(function() {
                                scope.showUploadButton = true;
                            })
                        }
                    });

                    scope.upload = function() {
                        var data = null;
                        if (scope.getAdditionalData) {
                            data = scope.getAdditionalData();
                        }
                        scope.uploading = true;
                        if (angular.version.major <= 1 && angular.version.minor < 2 ) {
                            //older versions of angular's q-service don't have a notify callback
                            //pass the onProgress callback into the service
                            fileUploader
                                .post(scope.names, scope.files, data, function(complete) {
                                    onProgress({percentDone: complete});
                                    scope.onProgress({percentDone: complete});
                                })
                                .to(scope.uploadUrl)
                                .then(function(ret) {
                                    onDone({files: ret.files, data: ret.data});
                                    scope.onDone({files: ret.files, data: ret.data});
                                }, function(error) {
                                    onError({files: scope.files, type: 'UPLOAD_ERROR', msg: error});
                                    scope.onError({files: scope.files, type: 'UPLOAD_ERROR', msg: error});
                                })
                        } else {
                            fileUploader
                                .post(scope.names, scope.files, data)
                                .to(scope.uploadUrl)
                                .then(function(ret) {
                                    onDone({files: ret.files, data: ret.data});
                                    scope.onDone({files: ret.files, data: ret.data});
                                }, function(error) {
                                    onError({files: scope.files, type: 'UPLOAD_ERROR', msg: error});
                                    scope.onError({files: scope.files, type: 'UPLOAD_ERROR', msg: error});
                                },  function(progress) {
                                    onProgress({percentDone: progress});
                                    scope.onProgress({percentDone: progress});
                                });
                        }
                    };

                    function onDone(done) {
                        scope.uploading = false;
                        scope.uploadStatus = "";
                        scope.defaultImageUrl = done.data.image_url;
                        console.log("Done", done);
                    }

                    function onError(error) {
                        scope.uploading = false;
                        console.log("Error", error);
                    }

                    function onProgress(progress) {
                        scope.progress = progress.percentDone;
                        scope.uploadStatus = progress.percentDone == 100 ? "Processing..." : progress.percentDone + "%";
                        console.log("Progress", progress);
                    }

                    function raiseError(files, type, msg) {
                        scope.onError({files: files, type: type, msg: msg});
                    }
                }
            }
        }
    }]);

})();

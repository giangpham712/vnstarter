App.factory('User', ['railsResourceFactory', 'railsSerializer', function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        rootWrapping: false,
        url: '/api/users/{{id}}',
        name: 'user',
        interceptors: [
            {
                'request': function(httpConfig, resourceConstructor, context) {
                    var data = httpConfig.data;
                    httpConfig.data = {};
                    if (data) {
                        httpConfig.data.user = data;
                    }

                    httpConfig.url += '.json';
                    return httpConfig;
                }
            }
        ]
    });
}]);
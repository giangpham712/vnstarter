App.factory('Post', ['railsResourceFactory', 'railsSerializer', function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        rootWrapping: false,
        url: '/api/projects/{{projectId}}/posts/{{id}}',
        name: 'post',
        interceptors: [
            {
                'request': function(httpConfig, resourceConstructor, context) {
                    var data = httpConfig.data;
                    httpConfig.data = {};
                    if (data) {
                        httpConfig.data.post = data;
                    }

                    httpConfig.url += '.json';
                    return httpConfig;
                }
            }
        ]
    });
}]);
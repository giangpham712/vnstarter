App.factory('Reward', ['railsResourceFactory', 'railsSerializer', function(railsResourceFactory, railsSerializer) {
    return railsResourceFactory({
        rootWrapping: false,
        url: '/api/projects/{{projectId}}/rewards/{{id}}',
        name: 'reward',
        interceptors: [
            {
                'request': function(httpConfig, resourceConstructor, context) {
                    var data = httpConfig.data;
                    httpConfig.data = {};
                    if (data) {
                        httpConfig.data.reward = data;
                    }

                    httpConfig.url += '.json';
                    return httpConfig;
                }
            }
        ]
    });
}]);
App.factory('Project', ['railsResourceFactory', 'railsSerializer', function(railsResourceFactory, railsSerializer) {
    var resource = railsResourceFactory({
        rootWrapping: false,
        url: '/api/projects/{{id}}.json',
        name: 'project',
        interceptors: [
            {
                'request': function(httpConfig, resourceConstructor, context) {
                    var data = httpConfig.data;
                    httpConfig.data = {};
                    if (data) {
                        httpConfig.data.project = data;
                    }

                    var url = httpConfig.url;
                    url = url.replace(/\/+$/, '') || '/';
                    url = url.replace(/\/\.(?=\w+($|\?))/, '.');
                    httpConfig.url = url;
                    return httpConfig;
                }
            }
        ]
    });

    resource.prototype.launch = function() {
        var url = resource.$url(this.id) + '?operation=launch';
        return this.$post(url);
    };

    return resource;
}]);
/**
 * Created by wadey on 4/7/2015.
 */

App.factory('Project', ['$resource', function ($resource) {
    function Project() {
        this.service = $resource('/api/projects/:projectId.json', {projectId: '@id'});
    };

    Project.prototype.all = function() {
        return this.service.query();
    };

    return new Project;
}]);
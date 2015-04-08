/**
 * Created by wadey on 4/7/2015.
 */

App.controller('ProjectsCtrl', ['$scope', 'Project', function($scope, Project) {
    $scope.projects = Project.all();
}]);
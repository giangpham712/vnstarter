(function () {
    'use strict';

    angular.module('project.editor',
        [
            'ngRoute',
            'ngResource',
            'rails',
            'templates'
        ]).value('gon', window.gon);

})();
(function () {
    'use strict';

    angular.module('project.editor',
    [
        'ngRoute',
        'ngResource',
        'rails'
    ]).value('gon', window.gon);

})();
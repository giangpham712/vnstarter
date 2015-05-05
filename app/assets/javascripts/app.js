(function () {
    'use strict';

    window.App = angular.module('VnStarter', ['ngResource', 'ngRoute', 'rails', 'templates']).value('gon', window.gon)

}());
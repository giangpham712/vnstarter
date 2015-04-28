(function () {
    'use strict';

    window.App = angular.module('VnStarter', ['ngResource', 'ngRoute', 'rails']).value('gon', window.gon)

}());
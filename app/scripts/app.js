'use strict';

/**
 * @ngdoc overview
 * @name crossoverApp
 * @description
 * # crossoverApp
 *
 * Main module of the application.
 */
angular
  .module('crossoverApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'md.data.table',
    'chart.js',
    'nvd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/templates/build-details.html',
        controller: 'BuildController',
        controllerAs: 'vmBuild'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

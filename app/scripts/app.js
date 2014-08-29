var barmadden = angular.module('barmaddenApp', ['ngRoute']);
barmadden.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/main.html',
      controller: 'mainController'
    });     
});
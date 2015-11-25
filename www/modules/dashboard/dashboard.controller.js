'use strict';

angular.module('dashboard', ['user'])

.controller('DashboardCtrl', function($scope, $location, AuthenticationService) {
  $scope.logout = function() {
    AuthenticationService.Logout();
    $location.path('/users');
  }
});
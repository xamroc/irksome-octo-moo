'use strict';

angular.module('dashboard', ['user'])

.controller('DashboardCtrl', function($scope, $location, $http, AuthenticationService) {
  $http.get('json/securities.json')
    .success(function(data, status, headers, config) {
      $scope.sData = data.map(JSON.parse)
    })
    .error(function(data, status, headers, config) {
      console.log(status);
    })

  $scope.logout = function() {
    AuthenticationService.Logout();
    $location.path('/users');
  }
})
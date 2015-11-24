'use strict';

angular.module('user', [])

.controller('UserCtrl', function($scope, $location, AuthenticationService) {
  $scope.login = function() {
    AuthenticationService.Login($scope.loginData.email, $scope.loginData.password, function (response) {
      if (response.success) {
        $location.path('/');
      } else {
        console.error(response.message);
      }
    });
  }
})

.service('AuthenticationService', function($timeout) {
  this.Login = function(email, password, callback) {
    var response;
    $timeout(function() {
      if (email === 'test' && password === 'test') {
        response = { success: true };
      } else {
        response =  { success: false, message: 'Email or password is incorrect' };
      }
      callback(response);
    }, 1000);
  }
});
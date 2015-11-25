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
  var isAuthenticated = false;
  this.Login = function(email, password, callback) {
    var response;
    $timeout(function() {
      if (email === 'test' && password === 'test') {
        isAuthenticated = true;
        response = { success: true };
      } else {
        response =  { success: false, message: 'Email or password is incorrect' };
      }
      callback(response);
    }, 1000);
  }
  this.Logout = function() {
    isAuthenticated = false;
  }
  this.isAuthenticated = function() {
    return isAuthenticated;
  }
});
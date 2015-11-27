'use strict';

angular.module('dashboard', ['user', "chart.js"])

.controller('DashboardCtrl', function($scope, $location, $http, AuthenticationService, securitiesData) {

  securitiesData.list(function(sData) {
    $scope.sData = sData.map(JSON.parse);
  });

  $scope.logout = function() {
    AuthenticationService.Logout();
    $location.path('/users');
  }
  $scope.tableView = function() {
    $location.path('/table');
  }
  $scope.overview = function() {
    $location.path('/');
  }
  $scope.labels = ["10", "20", "30", "40", "50", "60", "70"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65000, 59000, 80000, 81000, 56000, 55000, 40000],
    [28000, 48000, 40000, 19000, 86000, 27000, 90000],
    [18000, 38000, 42000, 29000, 85000, 17000, 40000]
  ];
  $scope.dLabels = ["Developed Markets", "Domestic Markets", "Emerging Markets", "Commodity", "Fixed-Income"];
  $scope.dData = [5, 15, 5, 7, 68];
  $scope.lData = [
    {title: 'PLOW', value: 1.02, change: '0.29%', volume: '16,193,210' },
    {title: 'WRI', value: 1.63, change: '0.57%', volume: '45,204,714'},
    {title: 'HJV', value: 0.04, change: '0.36%', volume: '31,688,489'},
    {title: 'CFG', value: 1.01, change: '2.14%', volume: '19,716,483'},
    {title: 'CYAN', value: 1.07, change: '1.05%', volume: '19,864,360'}
  ]
})

.controller('TableCtrl', function($scope, $stateParams, $location, securitiesData) {
  securitiesData.list(function(sData) {
    for (var i = 0; i < sData.length; i++) {
      var data = JSON.parse(sData[i]);
      if(data.id == $stateParams.tableId) {
        $scope.sData = data;
      }
    }
  });
  $scope.overview = function() {
    $location.path('/');
  }
  $scope.tableView = function() {
    $location.path('/table');
  }
})

.factory('securitiesData', function ($http) {
  return {
    list: function(callback) {
      $http.get('json/securities.json')
        .success(callback)
        .error(function(data, status, headers, config) {
          console.error(status);
        });
    }
  }
})
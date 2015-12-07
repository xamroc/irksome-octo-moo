'use strict';

angular.module('dashboard', ['user', 'chart.js', 'ionic.contrib.drawer.vertical'])

.controller('DashboardCtrl', function($scope, $location, $http, AuthenticationService, securitiesData, $ionDrawerVerticalDelegate, $timeout) {

  securitiesData.list(function(sData) {
    $scope.sData = sData.map(JSON.parse);
    var values = _.pluck($scope.sData, 'value');
    var parsedValues = values.map(JSON.parse);
    $scope.total = _.reduce(parsedValues, function(total, x) { return total + x }, 0).toFixed(2);
    $scope.totalString = numeral($scope.total).format('$0,0.00');
  });

  $scope.logout = function() {
    AuthenticationService.Logout();
    $location.path('/users');
  }

  $scope.fundText = "Add Funds";
  $scope.drawerClass = "bar bar-positive";

  $scope.drawerIsClosed = function() {
    return $ionDrawerVerticalDelegate.getState() === 'closed';
  }

  $scope.addAmount = function() {
    $scope.fundText = "Working...";
    $timeout(function() {
      $scope.fundText = "Done!";
    }, 1000);
    $timeout(function() {
      $scope.total = parseFloat($scope.total) + parseFloat($scope.amountChange);
      $scope.totalString = numeral($scope.total).format('$0,0.00');
      $scope.toggleDrawer();
    }, 1500);
  }

  $scope.subtractAmount = function() {
    $scope.fundText = "Working...";
    $timeout(function() {
      $scope.fundText = "Done!";
    }, 1000);
    $timeout(function() {
      $scope.total = $scope.total - $scope.amountChange;
      $scope.totalString = numeral($scope.total).format('$0,0.00');
      $scope.toggleDrawer();
    }, 1500);
  }

  $scope.toggleDrawer = function() {
    $ionDrawerVerticalDelegate.toggleDrawer();
    if ($scope.drawerClass === "bar bar-positive") {
      $scope.drawerClass = "bar bar-assertive";
      $scope.fundText = "Close";
    } else {
      $scope.drawerClass = "bar bar-positive";
      $scope.fundText = "Add Funds"
    }
  }

  $scope.labels = ["10", "20", "30", "40", "50", "60", "70"];
  $scope.series = ['Optimistic', 'Normal', 'Pessimistic'];
  $scope.data = [
    [30000, 27000, 30000, 34000, 32000, 36000, 40000],
    [30000, 25000, 27500, 30000, 31000, 34000, 35000],
    [30000, 20000, 21000, 23000, 19000, 22000, 31000]
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
        var price = numeral(data.price).format('$0,0.00');
        var value = numeral(data.value).format('$0,0.00');
        $scope.sData = { id: data.id,
                         companyName: data.companyName,
                         price: price,
                         shares: data.shares,
                         ticker: data.ticker,
                         value: value,
                         category: data.category };
      }
    }
  });
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
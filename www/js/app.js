// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'user', 'dashboard', 'ionic.contrib.drawer.vertical'])

.run(function($ionicPlatform, $rootScope, $location, AuthenticationService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    $rootScope.$on('$locationChangeStart', function() {
      if ($location.path() !== '/users' && !AuthenticationService.isAuthenticated()) {
        $location.path('/users');
      } else if ($location.path() === '/users' && AuthenticationService.isAuthenticated()) {
        $location.path('/');
      }
    })
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'modules/dashboard/overview.html',
      controller: 'DashboardCtrl'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'modules/users/login.html',
      controller: 'UserCtrl'
    })
    .state('table', {
      url: '/table',
      templateUrl: 'modules/dashboard/table.html',
      controller: 'DashboardCtrl'
    })
    .state('tableDetail', {
      url: '/table/:tableId',
      templateUrl: 'modules/dashboard/table.detail.html'
    })
    .state('composition', {
      url: '/composition',
      templateUrl: 'modules/dashboard/composition.html',
      controller: 'CompositionCtrl'
    })

  $urlRouterProvider.otherwise('/users');
})
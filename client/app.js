var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider

    .state({
      url: '/',
      name: 'home',
      transclude: true,
      component: 'home'
    })

    .state({
      url: '/loginSuccess',
      name: 'loginSuccess',
      component: 'loginSuccess',
    })


});

app.run(function($rootScope, $location, $state, apiService) {
    // if(!localStorage.token) $state.go('home');
    // return apiService.authCheck(localStorage.token);
});

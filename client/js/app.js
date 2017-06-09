/**
 * Created by PCK on 22-May-17.
 */
// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
                                                            $urlRouterProvider) {
    $stateProvider
      .state('add-complain', {
        url: '/add-complain',
        templateUrl: 'views/complain-form.html',
        controller: 'AddComplainController',
        authenticate: true
      })
      .state('all-complains', {
        url: '/all-complains',
        templateUrl: 'views/all-complains.html',
        controller: 'AllComplainsController'
      })
      .state('edit-complain', {
        url: '/edit-complain/:id',
        templateUrl: 'views/complain-form.html',
        controller: 'EditComplainController',
        authenticate: true
      })
      .state('delete-complain', {
        url: '/delete-complain/:id',
        controller: 'DeleteComplainController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-complains', {
        url: '/my-complains',
        templateUrl: 'views/my-complains.html',
        controller: 'MyComplainsController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      })
      .state('forgot-password',{
        url:'/login/forgot-password',
        templateUrl:'views/forgot-password.html',
        controller:'ForgotPasswordController',
      })
      .state('password-update-success', {
        url: '/forgot-password/success',
        templateUrl: 'views/forgot-password-success.html'
      });

    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // redirect to login page if not logged in
      if (toState.authenticate && !LoopBackAuth.accessTokenId) {
        event.preventDefault(); //prevent current page from loading

        // Maintain returnTo state in $rootScope that is used
        // by authService.login to redirect to after successful login.
        // http://www.jonahnisenson.com/angular-js-ui-router-redirect-after-login-to-requested-url/
        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };

        $state.go('forbidden');
      }
    });

    // Get data from localstorage after pagerefresh
    // and load user data into rootscope.
    if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }])
 /* .controller('Hello', function($scope,$http){
    $http.get('http://rest-service.guides.spring.io/greeting').
      then(function(response){
           $scope.greeting = response.data;
    });
});*/


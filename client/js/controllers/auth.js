/**
 * Created by PCK on 22-May-17.
 */
// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AuthLoginController', ['$rootScope','$scope', 'AuthService', '$state',
    function($rootScope,$scope, AuthService, $state) {
      $scope.user = {
      //  email: 'foo@bar.com',
      //  password: 'foobar'
      };
      $scope.error="";
     $rootScope.admin='admin@test.com';

      $scope.login = function() {
        AuthService.login($scope.user.email, $scope.user.password)
          .then(function() {
              // return to saved returnTo state before redirection to login
            if ($scope.returnTo && $scope.returnTo.state) {
              $state.go(
                $scope.returnTo.state.name,
                $scope.returnTo.params
              );
              // maintain the inherited rootscope variable returnTo
              // but make the returnTo state of it null,
              // so it can be used again after a new login.
              $scope.returnTo.state  = null;
              $scope.returnTo.params = null;
              return;
            }

              $state.go('my-complains');
            // or go to the default state after login
            /*if ($scope.user.email == $rootScope.admin) {
              $state.go('my-complains');
            }
            else
            {
              $state.go('add-complain');
            }*/

          },
            function (error) {
              $rootScope.newUserEmail  = $scope.user.email ;
              console.log($rootScope.newUserEmail );
              $scope.error = 'Emails / Password  not correct !! ';
            }
          );
      };
    }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      AuthService.logout()
        .then(function() {
          $state.go('login');
        });
    }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
      $scope.user = {
       // email: 'baz@qux.com',
       // password: 'bazqux'
      };

      $scope.error = "";

      $scope.register = function() {
        AuthService.register($scope.user.email, $scope.user.password)
          .then(function() {
            $state.transitionTo('sign-up-success');

          },
            function(error){
               $scope.error = 'User already exist !';
            }
          );
      };


    }])
  .controller('ForgotPasswordController',['$scope','$state','$rootScope','AuthService',
    function ($scope,$state,$rootScope,AuthService) {

      $scope.error ="";

      $scope.updatePassword = function(){
        console.log($scope.newPassword);
        console.log($rootScope.newUserEmail);

        if ( $scope.newPassword == $scope.confirmPassword)
        {
          console.log("matches");
          AuthService.updatePassword($rootScope.newUserEmail,$scope.newPassword)
            .then( function(){
              $state.transitionTo('password-update-success');
            },function(error){
              $scope.error = 'User already exist !';
            });


        }
        else
        {
          $scope.error = 'New password and confirm password does not match !!';
        }
      };




  }]);

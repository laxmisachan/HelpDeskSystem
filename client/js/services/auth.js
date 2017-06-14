/**
 * Created by Laxmi on 22-May-17.
 */


angular
  .module('app')
  .factory('AuthService', ['Complainer', '$q', '$rootScope', '$state', function(
    User, $q, $rootScope, $state) {
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email
          };
            }

        );
    }

    function logout() {
      return User
        .logout()
        .$promise
        .then(function() {
          $rootScope.currentUser = null;
        });
    }

    function register(email, password) {
      return User
        .create({
          email: email,
          password: password
        })
        .$promise;
    }

    function refresh(accessTokenId) {
      return User
        .getCurrent(function(userResource) {
          $rootScope.currentUser = {
            id: userResource.id,
            tokenId: accessTokenId,
            email: userResource.email
          };

        });
    }

    function updatePassword(email,password){
      console.log(password);
      return User
        .resetPassword({email: email, password: password})
        .$promise
        .then( function(){
          console.log(password );
        }, function(error){
          console.log("error");
        });
    }
    return {
      login: login,
      logout: logout,
      register: register,
      refresh: refresh,
      updatePassword:updatePassword
    };
  }]);

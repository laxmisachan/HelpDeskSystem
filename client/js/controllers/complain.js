/**
 * Created by PCK on 22-May-17.
 */
// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllComplainsController', ['$scope', 'Complain', function($scope,
                                                                    Complain) {
    $scope.complains = Complain.find({
      filter: {


      }
    });
  }])
 /* .controller('AddComplainController', ['$scope', 'CoffeeShop', 'Review',
    '$state', function($scope, CoffeeShop, Review, $state) {
      $scope.action = 'Add';
      $scope.coffeeShops = [];
      $scope.selectedShop;
      $scope.review = {};
      $scope.isDisabled = false;

      CoffeeShop
        .find()
        .$promise
        .then(function(coffeeShops) {
          $scope.coffeeShops = coffeeShops;
          $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
        });

      $scope.submitForm = function() {
        Review
          .create({
            rating: $scope.review.rating,
            comments: $scope.review.comments,
            coffeeShopId: $scope.selectedShop.id
          })
          .$promise
          .then(function() {
            $state.go('all-reviews');
          });
      };
    }])*/
  .controller('AddComplainController', ['$scope', 'Complain',
   '$state', function($scope, Complain, $state) {
   $scope.action = 'Add';
   $scope.complain = {};
   $scope.disable = false;
   $scope.enable = true ;
   $scope.hidden= true ;


   $scope.submitForm = function() {
     console.log($scope.complain.subject);
     console.log($scope.currentUser.id);

   Complain
   .create({
   date: Date.now(),
   subject: $scope.complain.subject,
   description: $scope.complain.description,
   attachment: $scope.complain.attachment,
   status: 'N',
   complainerID:$scope.currentUser.id ,

   })

   .$promise
   .then(function() {

       $state.go('my-complains');
   });
   };
   }])
  .controller('DeleteComplainController', ['$scope', 'Complain', '$state',
    '$stateParams', function($scope, Complain, $state, $stateParams) {
      Complain
        .deleteById({ id: $stateParams.id })
        .$promise
        .then(function() {
          $state.go('my-complains');
        });
    }])
  .controller('EditComplainController', ['$rootScope','$scope', '$q', 'Complain',
    '$stateParams', '$state', function($rootScope, $scope, $q, Complain,
                                       $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.complain = {};
      $scope.id = "";
      $scope.disable = true ;
      $scope.enable = false ;
      $scope.hidden = false ;
      $scope.error='';
      $scope.btnHide = false;

    // console.log($rootScope.currentUser.email);
    // console.log($rootScope.admin);



       Complain.findById({ id: $stateParams.id }).$promise

        .then(function(data) {
          $scope.complain = data;
          $scope.id=$scope.complain.complainerID ;
          if ($rootScope.currentUser.email == $rootScope.admin ){
            $scope.disable=true ;
            $scope.enable= false ;

          }
          else if ( $scope.complain.status != "N" )
          {
            $scope.error = "Complain can't be edited now. " ;
            $scope.disable=true ;
            $scope.enable= true ;
            $scope.btnHide = true ;
          }
          else
          {
            $scope.disable=false ;
            $scope.enable= true ;
          }


        });

       $scope.submitForm = function() {
         $scope.complain
          .$save()
          .then(function(complain) {
            $state.go('my-complains');
          });
      };
    }])
  .controller('MyComplainsController', ['$scope', 'Complain',
    function($scope, Complain) {
      // after a refresh, the currenUser is not immediately on the scope
      // So, we're watching it on the scope and load my complains only then.

      $scope.$watch('currentUser.id', function(value) {

        if (!value) {
          return;
        }

        if ($scope.currentUser.email == 'admin@test.com')
        {
          $scope.ad = "ad";
          $scope.complains = Complain.find({
            filter: {}
        })

        }
        else {
          $scope.complains = Complain.find({
            filter: {
              where: {
                complainerID: $scope.currentUser.id
              },
              include: []
            }
          });

        }
      });
    }]);

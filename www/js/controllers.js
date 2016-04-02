angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Events', id: 1, img: './img/event.jpg' },
      { title: 'Friends', id: 3, img: './img/friends.jpg' },
    { title: 'Preferences', id: 2, img: './img/preferences.jpg' }
    
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope) {
  console.log("login ctrl code running");
})


.service('FbSvc', function(){

  this.user;
  this.auth;
  this.authenticate = function () { };

  this.appHasReqPermissions = function () {
      if (auth) {
          if (auth.granted_scopes) {
              //check that granted_scopes includes both "publish_actions" and "user_managed_groups" and return true
              var permissionArray = auth.granted_scopes.split(',');
              var scopes_exist = ($.inArray("publish_actions", permissionArray) > -1) &&
                                      ($.inArray("user_managed_groups", permissionArray) > -1);
              return scopes_exist;
          }
      }
      return false;
  };

})


;


angular.module('gridListDemo1', ['ngMaterial'])
.controller('Ctrl', function($scope) {});



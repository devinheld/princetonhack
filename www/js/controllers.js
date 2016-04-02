angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    
    $scope.signIn = function(form)
    {
        console.log('Hit sign in');
        console.log(form.username.$viewValue);
        console.log(form.password.$viewValue);
        
    }
    
    $scope.init = function(id)
  {
    //This function is sort of private constructor for controller
        
        // must use DB to get data here based on id sent here.
        
    $scope.event = {name: id, attendees: [0,1,1], city: "Princeton", creator: "0", date: "04/06/2016", duration: "01:00", img: "http://www.elitetraveler.com/wp-content/uploads/2014/05/Princeton-University-small-1.jpg", location: "Friend's Center", state: "New Jersey", streetaddress: "123 Main St", time:"07:00", zipcode:"09123"};

  };
    
    

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

.controller('EventsCtrl', function($scope) {
   // $scope.event = $scope.location;
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope) {
  console.log("login ctrl code running");
})


.controller('FormCtrl', function($scope) {
  console.log("form ctrl code running");
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





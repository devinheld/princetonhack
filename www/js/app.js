// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(['$ionicPlatform','$rootScope', '$window', '$state', 'FbSvc',  function($ionicPlatform, $rootScope, $window, $state, FbSvc) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  //Use an immediately invoked function expression to setup
  (function (d) {
      // load the Facebook javascript SDK

      var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
          return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";

      ref.parentNode.insertBefore(js, ref);

  }(document));


  //since rootscope is globally accessible, create the user session here
  $rootScope.user = {};

  //connect app to Facebook
  $window.fbAsyncInit = function () {
        

      FB.init({
          appId: '1724603571126876',

          // check the authentication status at the start up of the app 
          status: true,

          //Enable cookies to allow the server to access the session 
          //cookie: true,

          /* Parse XFBML */
          xfbml: true,

          version: 'v2.5'
      });

      //wait on FB async init and do what's inside after FB has been initialized
      FB.getLoginStatus(function (response) {

          FbSvc.authenticate();
          //postToGroup();
          //console.log(response.authResponse)
              
      });

      FbSvc.authenticate = function ()
      {
          FB.login(function (response) {
              if(response.status !== "connected")
              {
                FbSvc.authenticate();
              }
              FbSvc.auth = response.authResponse;
              FbSvc.user = { "userID": response.authResponse.userID };
              console.log("AuthResponse: " + response.authResponse);
              $state.go('app.home');
             
          }, {
              scope: 'email,user_about_me,user_birthday,user_education_history,user_hometown,user_location,' + 
                     'user_photos,user_relationship_details,user_status',
              return_scopes: true
          });
          
      };

      FB.Event.subscribe('auth.authResponseChange', function (response) {
          //The user is not logged to the app, or into Facebook. Re-authenticate.
          if (response.status !== 'connected') {
              FbSvc.authenticate();
          }
      });

  };



}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
  
  // Will have to do below for every different page... 
  // change :playlistId to the name of the next page
  .state('app.events', {
      cache: false,
    url: '/home/1',
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.settings', {
    url: '/home/2',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.friends', {
    url: '/home/3',
    views: {
      'menuContent': {
        templateUrl: 'templates/friends.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.info', {
    url: '/home/1/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/moreinfo.html',
          controller: 'EventsCtrl'
      }
    }
  })
  
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

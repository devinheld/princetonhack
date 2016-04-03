angular.module('starter.controllers', ["firebase"])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $state) {

    $scope.event = [];
    $scope.search = [];
    $scope.signIn = function(form)
    {
        console.log('Hit sign in');
        console.log(form.username.$viewValue);
        console.log(form.password.$viewValue);
        
       $state.go('app.home');
        
    }
    
    
    $scope.getFriends = function(friends)
    {
        if (friends.id == 0) {
            console.log(' found 0 ');
            $scope.search.push(friends);
        }
    }
    
    $scope.friendpage = function(user)
    {
        console.log("friendpage");
       $scope.choice = user; 
        
    }
    $scope.init = function(id)
  {
    //This function is sort of private constructor for controller
        
        // must use DB to get data here based on id sent here.
        
      
        
        
        $scope.id = id;
        $scope.id.$loaded().then(function() {
        
        
        
          $state.go('app.info');
        });
  }
    

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
    
    .controller('OneCtrl', function($scope, $firebaseArray) {
   // $scope.event = $scope.location;
      var events = new Firebase("https://princetonhack.firebaseio.com/events");
  $scope.choose = $firebaseArray(events);
        
        
         $scope.choose.$loaded().then(function(group) {
   console.log(group.length); // data is loaded here
        
        
        
        angular.forEach($scope.choose, function(value, key) {
            console.log('name by lookingfor id', value.name, $scope.id);
        if (value.name == $scope.id) {
            console.log('found the event');
            //console.log('at 0 ', value.id, value.friend);
         //   $scope.f.push(value.friend);
          
        
            $scope.eventinfo = value;
            
            
            

        }
        
  });
    
  
});
    })
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Events', id: 1, img: './img/event.jpg' },
      { title: 'Friends', id: 3, img: './img/friends.jpg' },
    { title: 'Preferences', id: 2, img: './img/preferences.jpg' }
    
  ];
})

.controller('EventsCtrl', function($scope, $firebaseArray) {
   // $scope.event = $scope.location;
    
    
    var events = new Firebase("https://princetonhack.firebaseio.com/events");
  $scope.event = $firebaseArray(events);
    console.log('hi');
  
})


.controller('FriendsCtrl', function($scope, $firebaseArray){

  var friends_ref = new Firebase("https://princetonhack.firebaseio.com/friends");
  $scope.fri = $firebaseArray(friends_ref);
    $scope.friends = [];
    var num = 0;
    $scope.fri.$loaded().then(function(fri) {
   console.log(fri.length); // data is loaded here
        
        
        
        angular.forEach($scope.fri, function(value, key) {

        if (value.id == 0) {
            //console.log('at 0 ', value.id, value.friend);
         //   $scope.f.push(value.friend);
          
            num = num + 1;
            
            console.log('searching for: ', value.friend);
            var f = value.friend;
            var users_ref = new Firebase("https://princetonhack.firebaseio.com/users");
            $scope.users = $firebaseArray(users_ref);
            $scope.users.$loaded().then(function(users) {
                angular.forEach($scope.users, function(value, key) {
                if (value.id == f)
                {
                    console.log('find a friend match', value.id);
                    $scope.friends.push(value);
                }
                
                
                });
                
            });
            
            

        }
        
  });
        
        
        
});
    
    
   // console.log($scope.fri.length);
  //  for (var i = 0; i < $scope.fri.length; i++)
  //  {
  //      console.log($scope.fri[i].id);
  //  }
    
   // $scope.friends = $scope.fri;

    
 console.log('hello');

  var users_ref = new Firebase("https://princetonhack.firebaseio.com/users");
  $scope.users = $firebaseArray(users_ref);

    
    
/*
  angular.forEach($scope.db_friends, function(value, key) {
        console.log('hi');
        if (value.id == 0) {
          $scope.f.push(value.friend);
          console.log(value.friend);
          num = num + 1;

        }
        
  });

angular.forEach($scope.db_users, function(value, key) {

        for (var i = 0; i < num; i++) {
          if (value.id == $scope.f[i]) {

              $scope.friends.push(value);
          }
        }
        
  });
  */



  // $.each(db_friends, function(index,value){

  //   if(value.id == 0)
  //   {
  //     var friend_id = value.friend;

  //      $.each(db_users, function(index,value){

  //       if(value.id == friend_id)
  //       {
  //         $scope.friends.push(value);
  //       }
        
  //      });
  //   }

  // });

  





  // // download the data into a local object
  // var syncObject = $firebaseObject(ref);
  // // synchronize the object with a three-way data binding
  // // click on `index.html` above to see it used in the DOM!
  // syncObject.$bindTo($scope, "friends");

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope) {
  console.log("login ctrl code running");
})


.controller('FormCtrl', function($scope, $state, $firebaseArray) {
  console.log("form ctrl code running");



  var users_ref = new Firebase("https://radiant-torch-374.firebaseio.com/users/5");
  //$scope.array = $firebaseArray(users_ref);
  //friends_ref.set('User ' + name + ' says ' + text);


  var daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thurdsday", "Friday", "Saturday", "Sunday"];
  var time = ["Morning", "Afternoon", "Evening"];
  $scope.activities = ["Baseball", "Bowling", "Movie", "Coffee", "Drink at Bar", "Netflix and Chill"];

  // $scope.availability_data = [];

  // for(var i = 0; i < daysOfTheWeek.length; i++)
  // {
  //   $scope.availability_data.push({
  //     dayName:daysOfTheWeek[i],
  //     morning:false,
  //     afternoon:false,
  //     evening:false
  //   });
  // }


$scope.testBox = "asdasd";


  $scope.authorization = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postal: "",
      budget: 0,
      availability_data : [],
      activities:
      {
        baseball: false,
        bowling: false,
        movie: false,
        coffee: false,
        drink_at_bar: false,
        netflix_chill: false
      }
    };

  for(var i = 0; i < daysOfTheWeek.length; i++)
  {
    $scope.authorization.availability_data.push({
      dayName:daysOfTheWeek[i],
      morning:false,
      afternoon:false,
      evening:false
    });
  }

  $scope.signIn = function(form)
  {
      // console.log('Hit sign in');
      // console.log(form.firstname.$viewValue);
      // console.log(form.lastname.$viewValue);
      // console.log(form.email.$viewValue);

      console.log($scope.authorization);

      var data = {firstname: $scope.authorization.firstname,
                  lastname: $scope.authorization.lastname,
                  email: $scope.authorization.email,
                  phone: $scope.authorization.phone,
                  address: $scope.authorization.address,
                  city: $scope.authorization.city,
                  postal: $scope.authorization.postal,
                  budget: $scope.authorization.budget



                };

      //var json = JSON.parse($scope.authorization);

      users_ref.push(data);

     
      
     //$state.go('app.home');
      
  };

  $scope.test = function()
  {

    var x = 2;
  };


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





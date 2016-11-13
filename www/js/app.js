// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic',])
.factory('serviceName', ['Todo',function(Todo) {
    return {todo:Todo.list()};
}])


.controller('todoController', ['$scope', 'Todo','serviceName',
function($scope, Todo, serviceName) {

  $scope.user = serviceName.user;
    $scope.login = function() {
        serviceName.user = $scope.user;
    };
}
])
.controller('listController', ['$scope', 'Todo','serviceName',
function($scope, Todo, serviceName) {
  $scope.getPicture = function (options) {

   var options = {
      quality : 75,
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 0
   };

   Camera.getPicture(options).then(function(imageData) {
      $scope.picture = imageData;;
   }, function(err) {
      console.log(err);
   });
};
$scope.user = serviceName.user;
  $scope.todos = serviceName.todo;
    $scope.addTodo = function(todo) {
        todo.done=false;
        Todo.add(angular.copy(todo));
        todo.title = '';
        todo.mail = '';
        serviceName.todo = $scope.todos;
    };
}
])
.service('Todo', function() {


    var todos = [];

    this.list = function() {
        return todos;
    };

    this.add = function(todo) {
        todos.splice(0, 0, todo);
    };

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('/login', {
                url: '/',
                templateUrl: 'templates/login.html',
                controller: 'todoController'
            })
            .state('/home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'todoController'
            })
            .state('/movember', {
                url: '/movember',
                templateUrl: 'templates/movember.html',
                controller: 'listController'
            })
            .state('/maphoto', {
                url: '/maphoto',
                templateUrl: 'templates/maphoto.html',
                controller: 'listController'
            })
            .state('/main', {
                url: '/main',
                templateUrl: 'templates/main.html',
                controller: 'listController'
            });

        $urlRouterProvider.otherwise('/');
    });

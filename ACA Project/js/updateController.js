(function () {
    var todoapp = angular.module('todoapp');

    todoapp.controller('updateController', function ($scope, $http, $routeParams, $location) {
        $scope.getTodoById = function () {
            $http.get("http://localhost:8080/api/notes/id/" + $routeParams.id)
                .then(function (response) {
                    var todos = response.data;
                    if (todos.length == 1) {
                        $scope.todo = todos[0];
                    } else {
                        //TODO error message
                    }
                }, function (response) {
                    console.log('error http GET Todos by id: ' + response.status);
                });
        }

        $scope.updateTodoById = function () {
            $http.put("http://localhost:8080/api/notes", $scope.todo)
                .then(function (response) {
                    $scope.updateStatus = 'update successful';
                }, function (response) {
                    $scope.updateStatus = 'error trying to update todo';
                    console.log('error http PUT todo: ' + response.status);
                });
        }

        $scope.deleteTodoById = function () {
            $http.delete("http://localhost:8080/api/notes/" + $scope.todo.id)
                .then(function (response) {
                    $scope.updateStatus = 'delete successful';
                    $scope.disableUpdate = true;
                }, function (response) {
                    $scope.updateStatus = 'error trying to delete todo';
                    console.log('error http DELETE todo: ' + response.status);
                });
        }

        $scope.goToSearchView = function (id) {
            //window.alert('goToUpdateView Function called, todo.id '+ id)
            $location.path('/search/');
        }

        $scope.goToMainView = function (id) {
            //window.alert('goToUpdateView Function called, todo.id '+ id)
            $location.path('/main/');
        }

        $scope.getTodoById();
        $scope.today = new Date();
        $scope.ListType = ['Event', 'List', 'Personal_Library'];
    })
})()

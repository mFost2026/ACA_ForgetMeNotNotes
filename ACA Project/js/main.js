(function () {
    var todoapp = angular.module('todoapp', ['ngRoute']);
    todoapp.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "todoController"
            })
            .when("/search", {
                templateUrl: "search.html",
                controller: "searchController"
            })
            .when("/create", {
                templateUrl: "create.html",
                controller: "createController"
            })
            .when("/update/:id", {
                templateUrl: "update.html",
                controller: "updateController"
            })
            .when("/stack", {
                templateUrl: "stack.html"
            })
            .when("/resume", {
                templateUrl: "resume.html"
            })
            .otherwise({
                templateUrl: "main.html",
                controller: "todoController"
            });
    });
})()
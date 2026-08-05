(function () {
	var todoapp = angular.module('todoapp');

	todoapp.controller('createController', function ($scope, $http) {
		$scope.ListType = ['Event', 'List', 'Personal_Library'];

		$scope.createTodo = function () {
			if (($scope.todo.title != "" && $scope.todo.startDate != "" && $scope.todo.listtype != "")
				|| ($scope.todo.title != undefined && $scope.todo.startDate != undefined && $scope.todo.listtype != undefined)) {
				$http.post("http://localhost:8080/api/notes", $scope.todo)
					.then(function (response) {
						$scope.createStatus = 'create successful';
						$scope.disableCreate = true;
					}, function (response) {
						console.log('error http POST Todos: ' + response.status);
					});
			} else {
				$scope.createStatus = "⚠️ Error: Please fill out all required fields!";

			}

		}
		$scope.todo = $scope.todo || {};
		$scope.todo.startDate = new Date();
		$scope.today = new Date();

		$scope.clear = function () {
			$scope.todo.title = '';
			$scope.todo.startDate = '';
			$scope.todo.listtype = '';
			$scope.todo.note = '';
			$scope.createForm.$setUntouched();
			$scope.createForm.$setPristine();
			$scope.disableCreate = false;
			$scope.createStatus = '';
		}
	});
})()

(function () {
    var todoapp = angular.module('todoapp');

    todoapp.controller('todoController', function ($scope, $http, $location) {

        $scope.getTodaysTodos = function () {
            $http.get("http://localhost:8080/api/notes")
                .then(function (response) {
                    $scope.todos = response.data;
                    console.log('number of todos: ' + $scope.todos.length);
                }, function (response) {
                    console.log('error http GET todos: ' + response.status);
                });
        };

        $scope.orderByColumn = function (column) {
            $scope.orderByValue = column;
            if ($scope.reverse == true) {
                $scope.reverse = false;
            } else {
                $scope.reverse = true;
            }
        };

        $scope.goToUpdateView = function (id) {
            $location.path('/update/' + id);
        };

        $scope.goToSearchView = function () {
            $location.path('/search');
        };

        $scope.goToAddView = function () {
            $location.path('/create');
        };

        // --- FOOLPROOF IN-PLACE PRINTING ENGINE ---
        $scope.printSelectedTasks = function () {
            // 1. Filter out only the tasks that the user checked
            var selectedTasks = $scope.todos.filter(function (todo) {
                return todo.selectedForPrint === true;
            });
            // 2. Alert the user if they haven't selected anything
            if (!selectedTasks || selectedTasks.length === 0) {
                alert("Please select at least one task to print.");
                return;
            }
            // 3. Create or find an invisible print canvas directly on your current window page
            var printSection = document.getElementById('invisible-print-section');
            if (!printSection) {
                printSection = document.createElement('div');
                printSection.id = 'invisible-print-section';
                document.body.appendChild(printSection);
            }
            // 4. Wipe out any old printable data text strings and build the clean layout html
            printSection.innerHTML = '<h1 style="border-bottom: 2px solid #000; padding-bottom: 10px; font-size: 24px; font-family: Arial, sans-serif;">\'Forget Me Not\' Selected Tasks Summary Sheet</h1>';

            selectedTasks.forEach(function (todo) {
                printSection.innerHTML += '<div style="border-bottom:1px dashed #ccc; padding:15px 0; font-family: Arial, sans-serif;">' +
                    '<div style="font-weight:bold; font-size:18px; margin-bottom:5px; color:#000;">' + (todo.title || 'Untitled Task') + '</div>' +
                    '<div style="font-size:13px; color:#555; margin-bottom:5px;"><strong>Type:</strong> ' + (todo.listtype || 'N/A') + ' | <strong>Start Date:</strong> ' + (todo.startDate || 'N/A') + ' | <strong>Status:</strong> ' + (todo.done ? 'Completed' : 'Pending') + '</div>' +
                    (todo.note ? '<div style="font-style:italic; font-size:14px; color:#444; background:#f9f9f9; padding:4px 8px; border-left:3px solid #ccc; margin-top:4px;"><strong>Note:</strong> ' + todo.note + '</div>' : '') +
                    '</div>';
            });
            // 5. Fire off the browser print layout routine engine instantly on the current thread
            window.print();
        };
    });
})();

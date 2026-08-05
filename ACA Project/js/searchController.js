(function () {
    var todoapp = angular.module('todoapp');

    todoapp.controller('searchController', function ($scope, $http, $location) {
        $scope.getTodaysTodos = function () {
            $http.get("http://localhost:8080/api/notes")
                .then(function (response) {
                    $scope.todos = response.data;
                    console.log('number of todos: ' + $scope.todos.length);
                }, function (response) {
                    console.log('error http GET todos: ' + response.status);
                });
        }

        $scope.getTodaysTodos();

        $scope.goToUpdateView = function (id) {
            //window.alert('goToUpdateView Function called, todo.id '+ id)
            $location.path('/update/' + id)
        }

        $scope.goToSearchView = function (id) {
            //window.alert('goToUpdateView Function called, todo.id '+ id)
            $location.path('/search/');
        }

        $scope.goToMainView = function (id) {
            //window.alert('goToUpdateView Function called, todo.id '+ id)
            $location.path('/main/');
        }

        // Initialize your variables at the top of your controller so they aren't undefined!
        $scope.orderByValue = 'id';
        $scope.reverse = false;

        $scope.orderByColumn = function (column) {
            if ($scope.orderByValue === column) {
                // Master toggle trick: swaps true to false, or false to true instantly
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.orderByValue = column;
                $scope.reverse = false; // Reset direction when changing columns
            }
        };


        // --- FOOLPROOF DIRECT-PRINT ACTION FOR THE UPDATE VIEW ---
        $scope.printSelectedTasks = function () {
            // 1. Gathers rows selected by user checkboxes
            var selectedTasks = $scope.todos.filter(function (todo) {
                return todo.selectedForPrint === true;
            });
            // 2. Halts if nothing is checked
            if (!selectedTasks || selectedTasks.length === 0) {
                alert("Please select at least one task to print.");
                return;
            }
            // 3. Spawns or references the local printable container layer
            var printSection = document.getElementById('invisible-print-section');
            if (!printSection) {
                printSection = document.createElement('div');
                printSection.id = 'invisible-print-section';
                document.body.appendChild(printSection);
            }

            printSection.innerHTML = '<h1 class="print-heading">\'Forget Me Not\' Selected Tasks Summary Sheet</h1>';

            selectedTasks.forEach(function (todo) {
                // Strips underscores for clean formatting
                var polishedListType = todo.listtype ? todo.listtype.replace(/_/g, ' ') : 'N/A';

                printSection.innerHTML += '<div class="print-item-row">' +
                    '<div class="print-item-title">' + (todo.title || 'Untitled Task') + '</div>' +
                    '<div class="print-item-meta"><strong>Type:</strong> ' + polishedListType + ' &nbsp;|&nbsp; <strong>Start Date:</strong> ' + (todo.startDate || 'N/A') + ' &nbsp;|&nbsp; <strong>Status:</strong> ' + (todo.done ? 'Completed' : 'Pending') + '</div>' +
                    (todo.note ? '<div class="print-item-note"><strong>Note:</strong> ' + todo.note + '</div>' : '') +
                    '<div class="print-manual-note">Notes:</div>' +
                    '</div>';
            });
            // 5. Instantly invokes the hardware's printing overlay
            window.print();
        };

        $scope.showCompleted = false;

        $scope.archiveSelectedTasks = function () {
            // 1. Gather all tasks where the checkbox is selected
            var tasksToArchive = $scope.todos.filter(function (todo) {
                return todo.selectedForPrint;
            });

            if (tasksToArchive.length === 0) {
                alert("Please select at least one task to archive.");
                return;
            }

            // 2. Optional: Add a confirmation dialog
            if (confirm("Are you sure you want to archive " + tasksToArchive.length + " selected task(s)?")) {

                // Loop through and process each selected task
                tasksToArchive.forEach(function (todo) {
                    console.log("Archiving task ID:", todo.id);
                });
                // 3. Remove archived items from the active local UI array
                $scope.todos = $scope.todos.filter(function (todo) {
                    return !todo.selectedForPrint;
                });

                alert("Selected tasks have been successfully archived.");
            }
        };

        $scope.allSelected = false;

        $scope.toggleSelectAll = function () {
            // Toggle the master selection state
            $scope.allSelected = !$scope.allSelected;

            // Loop through your list and match the checkbox state
            $scope.todos.forEach(function (todo) {
                // If hiding completed items, only change checkboxes on active/false tasks
                if (!$scope.showCompleted && todo.done) {
                    todo.selectedForPrint = false;
                } else {
                    todo.selectedForPrint = $scope.allSelected;
                }
            });
        };
    })
})()
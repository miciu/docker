angular.module('aws-app').controller('itemController',
    ['$scope', '$http', function ($scope, $http) {

        $scope.items = [];

        this.addItem = function (item) {
            if (!_.include($scope.items, item)) {
                $scope.items.push(item);
            }
        };

        this.removeItem = function removeItem(row) {
            var index = $scope.items.indexOf(row);
            if (index !== -1) {
                $scope.items.splice(index, 1);
            }
        };

        function loadItems(){
            $http.get('/items').then(function (response) {
                if(response.status === 200)
                {
                    $scope.items = response.data;
                }
            }, function(err){
                console.log('Cannot load items. ',err);
            });
        }
        loadItems();
    }]);

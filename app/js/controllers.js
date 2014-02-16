/**
 * Created by gukaysen on 06.01.14.
 */
angular.module('OpenSailing.controllers', [])
    .controller('RaceDashboardController', function ($scope, RaceService, $location) {
        $scope.dashboard = {
            filter: 'all',
            races: RaceService.query(),
            selectedRace: 'undefined'
        };

        $scope.editForm = function (id) {
            $location.path('/race/' + id);
        }
    })
    .controller('RaceEditorController', function ($scope, $routeParams, RaceService) {
        $scope.race = {
            name: undefined,
            description: undefined,
            start_date: undefined,
            end_date: undefined
        };

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8,
            markers: []
        };

        if ($routeParams.raceId != 'undefined') {
            $scope.race = RaceService.get({raceId: $routeParams.raceId});
        }

        // save() function for web form
        $scope.saveForm = function () {
            console.log('saveForm() called');
            RaceService.post($scope.race);
        };

        // reset() function for web form
        $scope.deleteForm = function () {
            console.log('deleteForm() called');
            RaceService.remove({raceId: $routeParams.raceId});
            $scope.race = {};

        };


    })
    .controller('LoginController', function ($scope) {
        $scope.login = {
            user_name: 'Username'
        }
    });

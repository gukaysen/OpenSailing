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
            end_date: undefined,
            selectedTrack : undefined,
            tracks: [
                {
                    name: undefined,
                    description: undefined
                }
            ]
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

        // addTrack() function for web form
        $scope.addTrack = function() {
            console.log('addTrack() called');
            if (!$scope.race.tracks) {
                $scope.race.tracks = new Array();
            }

            $scope.race.tracks.push(
                {
                    name: 'Name of track',
                    description: 'Description of track'
                }
            );
            $scope.race.selectedTrack = $scope.race.tracks.length-1;
        };

        // selectTrack() function for web form
        $scope.selectTrack = function(index) {
            $scope.race.selectedTrack = index;
        }


    })
    .controller('LoginController', function ($scope) {
        $scope.login = {
            user_name: 'Username'
        }
    });

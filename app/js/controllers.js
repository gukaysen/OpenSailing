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

        google.maps.visualRefresh = true;

        $scope.race = {
            name: undefined,
            description: undefined,
            start_date: undefined,
            end_date: undefined,
            selectedTrack: undefined,
            tracks: [
                {
                    name: undefined,
                    description: undefined,
                    mode: undefined
                }
            ]
        };

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 20,
            draggable: true,
            dragging: false,
            options: {
                mapTypeControl: false,
                mapTypeId: 'hybrid',
                overviewMapControl: false,
                streetViewControl: false,
                tilt: 45,
                panControl: false

            },
            bounds: {},
            starting_line: {
                path: [
                    {
                        latitude: undefined,
                        longitude: undefined
                    },
                    {
                        latitude: undefined,
                        longitude: undefined
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 2
                }

            },
            finishing_line: {},
            waypoints: {},
            events: {
                tilesloaded: function (map, eventName, originalEventArgs) {

                },
                click: function (mapModel, eventName, originalEventArgs) {
                    console.log('click_event received: ' + eventName);
                    var e = originalEventArgs[0],
                        p1 = e.latLng,
                        p2 = google.maps.geometry.spherical.computeOffset(p1, 100, 90);

                    $scope.map.starting_line.path[0].latitude = p1.lat();
                    $scope.map.starting_line.path[0].longitude = p1.lng();
                    $scope.map.starting_line.path[1].latitude = p2.lat();
                    $scope.map.starting_line.path[1].longitude = p2.lng();

                    $scope.$apply();
                }
            }
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
        $scope.addTrack = function () {
            console.log('addTrack() called');
            if (!$scope.race.tracks) {
                $scope.race.tracks = [];
            }

            $scope.race.tracks.push(
                {
                    name: 'Name of track',
                    mode: 'SL_SELECT'
                }
            );
            $scope.race.selectedTrack = $scope.race.tracks.length - 1;
        };

        // selectTrack() function for web form
        $scope.selectTrack = function (index) {
            $scope.race.selectedTrack = index;
        };

        // deleteTrack() function for web form
        $scope.deleteTrack = function (index) {
            $scope.race.tracks.splice(index, 1);
            $scope.race.selectedTrack = $scope.race.tracks.length === 0 ? undefined : $scope.race.tracks.length - 1;
        };

        // selectTrackMode() function for web form
        $scope.selectTrackMode = function (mode) {
            console.log('selectTrackMode called: ' + mode);
            if ($scope.race.selectedTrack != undefined) {
                if ($scope.race.tracks[$scope.race.selectedTrack].mode != mode) {
                    $scope.race.tracks[$scope.race.selectedTrack].mode = mode;
                } else {
                    $scope.race.tracks[$scope.race.selectedTrack].mode = undefined;
                }
            }
        }
    })
    .controller('LoginController', function ($scope) {
        $scope.login = {
            user_name: 'Username'
        }
    });

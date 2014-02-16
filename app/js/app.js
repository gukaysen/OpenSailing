/**
 * Created by gukaysen on 06.01.14.
 */
var app = angular.module('OpenSailing', [
    'OpenSailing.controllers',
    'OpenSailing.services',
    'ngRoute',
    'google-maps'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/races', {
            templateUrl: 'views/partials/dashboard.html',
            controller: 'RaceDashboardController'
        })
        .when('/newRace', {
            templateUrl: 'views/partials/race_editor.html',
            controller: 'RaceEditorController'
        })
        .when('/race/:raceId', {
            templateUrl: 'views/partials/race_editor.html',
            controller: 'RaceEditorController'
        })
        .when('/login', {
            templateUrl: 'views/partials/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/races'
        });
});
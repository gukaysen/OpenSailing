/**
 * Created by gukaysen on 08.01.14.
 */
angular.module('OpenSailing.services', ['ngResource'])
    .factory('RaceService', function($resource) {
        return $resource('api/races/:raceId', {}, {
            query: {method: 'GET', params: {raceId: 'list'}, isArray: true},
            post: {method:'POST', params: {raceId: 'new'}},
            update: {method:'PUT'},
            remove: {method:'DELETE'}
        })
    }
    .factory('TrackService', function($resource) {
        return $resource('api/tracks/:trackId', {}, {
            query: {method: 'GET', params: {trackId: 'list'}, isArray: true},
            post: {method: 'POST', params: {trackId: 'new'}},
            update: {method: 'PUT'},
            remove: {method: 'DELETE'}
        })
    }));
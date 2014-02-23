/**
 * Created by gukaysen on 08.01.14.
 */
var mongoose = require('mongoose');
var schema = require('../db/schema');
var db = mongoose.createConnection('localhost', 'sailing');

// JSON API for list of races
exports.listRaces = function (req, res) {
    var RaceBO = db.model('RaceBO', schema.RaceSchema);
    RaceBO.find({}, function (err, races) {
        console.log("api.listRaces() called: " + races);
        res.json(races)
    });
};

// JSON API for creating or modifying a race
exports.saveRace = function (req, res) {
    var RaceBO = db.model('RaceBO', schema.RaceSchema),
        race;
    console.log("api.saveRace() called: " + req.body._id);

    if (req.body._id) {
        var newBo = JSON.parse(JSON.stringify(req.body));
        delete newBo['_id'];
        var query = {"_id" : req.body._id};

        console.log(newBo);

        race = RaceBO.findOneAndUpdate(query, newBo, function (err, doc) {
            if (err || !doc) {
                throw err;
            } else {
                res.json(doc);
            }
        })
    } else {
        race = new RaceBO(req.body);
        race.save(function (err, doc) {
            if (err || !doc) {
                res.json({error: err});
            } else {
                res.json(doc);
            }
        });
    }
};

// JSON API for finding a single race
exports.findRace = function (req, res) {
    var raceId = req.params.raceId,
        RaceBo = db.model('RaceBO', schema.RaceSchema);

    console.log("api.findRace() called: " + req.params.raceId);

    RaceBo.findById(raceId, '', {}, function (err, race) {
        if (race) {
            res.json(race);
        } else {
            res.json({error: true});
        }
    });
};

// JSON API for deleting a race
exports.deleteRace = function (req, res) {
    var raceId = req.params.raceId,
        RaceBo = db.model('RaceBO', schema.RaceSchema);

    console.log("api.deleteRace() called: " + req.params.raceId);

    RaceBo.findByIdAndRemove(raceId, function (err) {
        if (err) {
            res.json({error: true});
        }
    });
};

// JSON API for

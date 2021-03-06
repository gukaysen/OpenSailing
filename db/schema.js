/**
 * Created by gukaysen on 07.01.14.
 */
var mongoose = require('mongoose');

var TrackSchema = new mongoose.Schema(
    {
        name: String,
        starting_line: {
            mark_1_loc: {type: [Number], index: '2D'},
            mark_2_loc: {type: [Number], index: '2D'}
        },
        finishing_line: {
            mark_1_loc: {type: [Number], index: '2D'},
            mark_2_loc: {type: [Number], index: '2D'}
        },
        waypoints: [
            {
                name: String,
                mark_loc: {type: [Number], index: '2D'}
            }
        ],
        course: [
            {
                order: Number,
                wp_name: String
            }
        ]
    },
    {
        collection: 'tracks',
        strict : true
    }
);

var RaceSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        start_date: Date,
        end_date: Date,
        status: String,
        tracks: [TrackSchema],
        participants: [
            {
                boat_id: Number
            }
        ],
        heats: [
            {
                name: String,
                start_time: Date,
                track_id: Number,
                status: String,
                participants: [
                    {
                        boat_id: Number,
                        position: Number,
                        status: String,
                        finishing_time: Date
                    }
                ],
                loc: [
                    {
                        boat_id: Number,
                        timestamp: {type: Date, default: new Date().getTime()},
                        pos: {type: [Number], index: '2D'}
                    }
                ]
            }
        ]
    },
    {
        collection: 'races',
        strict: true
    }
);

var UserSchema = new mongoose.Schema(
    {
        name: String,
        first_name: String,
        last_name: String,
        email: String
    },
    {
        collection: 'users',
        strict: true
    }
);

var BoatSpecSchema = new mongoose.Schema(
    {
        name: String,
        length: Number,
        width: Number,
        sail_are: Number,
        class_type: String,
        yardstick: Number,
        img: String
    },
    {
        collection: 'boat_specs',
        strict : true
    }
);

var BoatSchema = new mongoose.Schema(
    {
        sail_number: String,
        name: String,
        boat_spec_id: Number,
        building_year: Number,
        contact_id: Number
    },
    {
        collection: 'boats',
        strict : true
    }
);

exports.RaceSchema = RaceSchema;
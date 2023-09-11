const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    coOrdinates: {
        type: {
            longitude: Number,
            latitude: Number
        },
        required: true
    }
});

const BusDetails = new mongoose.Schema({
    BusNo: {
        type: String,
        required: true
    },

    DriverName: {
        type: String,
        required: true
    },

    ConductorName: {
        type: String,
        required: true
    },

    ConductorMobile: {
        type : Number ,
        required: true 
    },

    SeatsAvailable: {
        type: Number,
        required: true,
        min: 0,
        max: 60
    },
    busStops: [busStopSchema]
});

const BusDetailDB = mongoose.model('BusDetailDB', BusDetails);

module.exports = BusDetailDB;

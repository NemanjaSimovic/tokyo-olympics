import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Sportista = new Schema({
    imeIPrezime: {
        type: String, unique: true
    },
    pol: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: [{
        type: String
    }],
    rang: {
        type: Number
    },
    brZlatnih: {
        type: Number
    },
    brSrebrnih: {
        type: Number
    },
    brBronzanih: {
        type: Number
    },    
    brUkupno: {
        type: Number
    },    
    prihvacen: {
        type: Boolean
    }
});

Sportista.plugin(uniqueValidator);

module.exports = mongoose.model("Sportista", Sportista, 'sportisti');
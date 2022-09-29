import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Zemlja = new Schema({
    skraceno: {
        type: String, unique: true
    },
    naziv: {
        type: String
    },
    zastava: {
        type: String
    },
    brSportista: {
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
    imaVodju: {
        type: Boolean
    }
});

Zemlja.plugin(uniqueValidator);

module.exports = mongoose.model("Zemlja", Zemlja, 'zemlje');
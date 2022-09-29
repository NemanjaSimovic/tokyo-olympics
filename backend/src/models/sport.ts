import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Sport = new Schema({
    ime: {
        type: String, unique: true
    },
    discipline: {
        type: Array
    }
});

Sport.plugin(uniqueValidator);

module.exports = mongoose.model("Sport", Sport, 'sportovi');
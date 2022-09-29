import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Disciplina = new Schema({
    naziv: {
        type: String, unique: true
    },
    sport: {
        type: String
    },
    individualni: {
        type: Boolean
    },
    takM: {
        type: Boolean
    },
    takW: {
        type: Boolean
    }
});

Disciplina.plugin(uniqueValidator);

module.exports = mongoose.model("Disciplina", Disciplina, 'discipline');
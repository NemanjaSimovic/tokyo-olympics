import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const TipForme = new Schema({
    ime: {
        type: String, unique: true
    }
});

TipForme.plugin(uniqueValidator);

module.exports = mongoose.model("TipForme", TipForme, 'tipoviformi');
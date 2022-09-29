import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Lokacija = new Schema({
    ime: {
        type: String, unique: true
    }
});

Lokacija.plugin(uniqueValidator);

module.exports = mongoose.model("Lokacija", Lokacija, 'lokacije');
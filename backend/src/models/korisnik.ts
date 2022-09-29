import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Korisnik = new Schema({

    username: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    email: {
        type: String, unique: true
    },
    tip: {
        type: String
    },    
    aktivan: {
        type: Number
    },
    takmicenja: {
        type: Array
    },
    brTakmicenja: {
        type: Number
    }
});

Korisnik.plugin(uniqueValidator);

module.exports = mongoose.model("Korisnik", Korisnik, 'korisnici');
import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Takmicenje = new Schema({
    ime: {
        type: String, unique: true
    },
    format: { //koristicemo samo ime formata, zato sto je takodje unique
        type: String
    },
    pol: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    pocetak: {
        type: String
    },
    kraj: {
        type: String
    },
    lokacija: {
        type: String
    },
    delegat: { //username delegata, s obzirom da je unique.
        type: String
    },
    sportisti: { // niz imena(i prezimena) sportista, s obzirom da su unique
        type: Array
    },
    prvoMesto: {
        type: String //ime sportiste koji osvojio zlatnu medalju
    },
    drugoMesto: {
        type: String //ime sportiste koji osvojio srebrnu medalju
    },
    treceMesto: {
        type: String //ime sportiste koji osvojio bronzanu medalju
    },
    formirano: { // formirano od strane organizatora, nakon sto je odabrao takmicare
        type: Boolean
    },    
    zavrseno: { // zavrseno takmicenje ne moze delegat da selektuje da se igraju utakmice.
        type: Boolean
    }
});

Takmicenje.plugin(uniqueValidator);

module.exports = mongoose.model("Takmicenje", Takmicenje, 'takmicenja');
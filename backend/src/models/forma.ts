import mongoose from 'mongoose';

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const Forma = new Schema({
    ime: {
        type: String, unique: true
    },
    tip: {
        type: String //trka - meri se vreme, daljina-visina - skokovi i izbacaji, streljastvo - broj pogodaka, 1 na 1/tim na tim sportovi - meri se broj poena jednog i drugog tima ili individualca. 
    },
    minIgraca: {
        type: Number
    },
    maxIgraca: {
        type: Number
    },
    brRundi: {
        type: Number //kod trka, broj trka, kod izbacivanja kugli broj bacanja, kod streljanja takodje postoji broj rundi ....
    },
    stotinke: {
        type: Boolean
    },
    minuti: {
        type: Boolean
    },
    casovi: {
        type: Boolean
    }



});

Forma.plugin(uniqueValidator);

module.exports = mongoose.model("Forma", Forma, 'forme');
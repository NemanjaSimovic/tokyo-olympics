import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Prijava = new Schema({
    imeIPrezime: { // ime i prezime sportiste
        type: String
    },
    nacionalnost: { //nacionalnost sportiste
        type: String
    },
    takmicenje: { //samo ime takmicenja s obzirom da je unique
        type: String
    },
    prihvacena: { //ovo postoji, kako se nakon prihvacene prijave ne bi opet prijavio isti sportista za isto takmicenje!
        type: Boolean
    }
});

module.exports = mongoose.model("Prijava", Prijava, 'prijave');
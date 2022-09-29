import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

const Korisnik = require('../models/korisnik');
const Zemlja = require('../models/zemlja');
const Sport = require('../models/sport');
const Sportista = require('../models/sportista');
const Disciplina = require('../models/disciplina');
const Forma = require('../models/forma');
const Takmicenje = require('../models/takmicenje');
const Prijava = require('../models/prijava');
const TipForme = require('../models/tipforme');
const Lokacija = require('../models/lokacija');

router.post("/login", (req, res, next) =>{ // returns adequate message in case when user(korisnik) is not found, or returns a user(korisnik) data if such exists with a "Success!" message.
    const username = req.body.username;
    const password = req.body.password;

    Korisnik.findOne({username: username}).then((korisnik: any) => {
        if(!korisnik){
            res.json({'message': "No User found!", 'korisnik': null, 'tip': null});
        }else{
            Korisnik.findOne({username: username, password: password}).then((korisnik2: any) => {
                if(!korisnik2){
                    res.json({'message': "Wrong password!", 'korisnik': null, 'tip': null});
                }else{
                    res.status(200).json({'message': "Success!", 'korisnik': korisnik2, 'tip': korisnik2.tip});
                }
            });
        }
    });
});

router.post("/change/password", (req, res, next) =>{ // returns adequate message in case when user(korisnik) is not found, or returns a user(korisnik) data if such exists with a "Success!" message.
    const username = req.body.username;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    Korisnik.findOne({username: username}).then((korisnik: any) => {
        if(!korisnik){
            res.json({'message': "No User found!"});
        }else{
            Korisnik.findOne({username: username, password: password}).then((korisnik2: any) => {
                if(!korisnik2){
                    res.json({'message': "Wrong Current(Old) password!"});
                }else{
                    Korisnik.updateOne({username: username, password: password}, {$set: {password: newPassword}}).then((korisnik2: any) => {
                        res.json({'message': "Success!"});
                    });
                }
            });
        }
    });
});

router.post("/register", (req, res, next) => {

    Korisnik.findOne({username: req.body.username}).then((korisnik: any) => {
        if(korisnik){
            res.json({'message': "User with that username already exists!"});
        }else{
            Korisnik.findOne({email: req.body.email}).then((korisnik: any) => {
                if(korisnik){
                    res.json({'message': "User with that email already exists!"});
                }else{
                    if(!req.body.tip.localeCompare('vodja')){
                        Korisnik.findOne({tip: "vodja", nacionalnost: req.body.nacionalnost}).then((korisnik: any) => {
                            if(korisnik){
                                res.json({'message': "Leader for this country already exists!"});
                            } else{
                                if(req.body.tip=="vodja"){
                                    Zemlja.updateOne({ skraceno: req.body.nacionalnost}, {$set: {imaVodju: true}}).then((result: any) => {
                                        console.log("Country updated");
                                    })
                                }

                                const korisnik = new Korisnik({
                                    username: req.body.username,
                                    password: req.body.password,
                                    ime: req.body.ime, 
                                    prezime: req.body.prezime,
                                    nacionalnost: req.body.nacionalnost,
                                    email: req.body.email,
                                    tip: req.body.tip,
                                    aktivan: false,
                                    takmicenja: [],
                                    brTakmicenja: 0
                                });
                                
                                console.log("Vodja Added!");
                                korisnik.save()
                                .then((result: any) => {
                                    res.status(201).json({
                                    message: "Success!"
                                    });
                                });
                            }
                        });
                    }else{
                        const korisnik = new Korisnik({
                            username: req.body.username,
                            password: req.body.password,
                            ime: req.body.ime, 
                            prezime: req.body.prezime,
                            nacionalnost: req.body.nacionalnost,
                            email: req.body.email,
                            tip: req.body.tip,
                            aktivan: false,
                            takmicenja: [],
                            brTakmicenja: 0
                        });
                        
                        console.log("Delegat Added!");
                        korisnik.save()
                        .then((result: any) => {
                            res.status(201).json({
                            message: "Success!"
                            });
                        });
                    }
                }
            });
        }
    });

});

router.post("/korisnik/approve", (req, res, next) => {
    var username = req.body.username;

    Korisnik.updateOne({ username: username }, {$set: { aktivan: 1 } })
            .then((result: any) => {
                console.log(result);
                
                Korisnik.findOne({username: username}).then((student: any) => {
                    res.json({message: "Korisnik " + username + " je upsesno odobren, i dodat u sistem!"});
                });

            });
});

router.get("/korisnici/find/unapproved", (req, res, next) =>{ // returns list of unapproved korisniks
    Korisnik.find({aktivan: !1}).then((korisnici: any) =>{
        res.status(201).json({'message': "Success!", 'korisnici': korisnici});
    });
});

router.get("/korisnici/find/available/delegat", (req, res, next) =>{ // returns list of unapproved korisniks
    Korisnik.find({tip: "delegat", aktivan: 1,  brTakmicenja: { $lte: 2 } }).then((delegati: any) =>{
        res.status(201).json({'message': "Success!", 'delegati': delegati});
    });
});

router.get("/zemlje/find/all", (req, res, next) =>{ // returns all zemlje
    Zemlja.find().then((zemlje: any) =>{
        res.status(201).json({'message': "Success!", 'zemlje': zemlje});
    });
});
router.get("/zemlje/find/withoutleader", (req, res, next) =>{ // returns zemlje that have no vodja
    Zemlja.find({imaVodju: false}).then((zemlje: any) =>{
        res.status(201).json({'message': "Success!", 'zemlje': zemlje});
    });
});

router.get("/sportisti/find/all", (req, res, next) =>{ // returns all Athletes
    Sportista.find().then((sportisti: any) =>{
        res.status(201).json({'message': "Success!", 'sportisti': sportisti});
    });
});

router.post("/sportisti/find/bydisciplina", (req, res, next) =>{ // returns Athletes by Discipline
    var disciplina = req.body.disciplina;
    var pol = req.body.pol;
    var nacionalnost = req.body.nacionalnost;
    Sportista.find({discipline: disciplina, pol: pol, nacionalnost: nacionalnost, prihvacen: false}).then((sportisti: any) =>{
        res.status(201).json({'message': "Success!", 'sportisti': sportisti});
    });
});

router.post("/sportisti/dohvati/rang", (req, res, next) =>{ // returns Tenis Rang for this athlete
    var imeIPrezime = req.body.imeIPrezime
    Sportista.findOne({imeIPrezime: imeIPrezime}).then((sportista: any) =>{
        res.status(201).json({'message': "Success!", 'rang': sportista.rang});
    });
});

router.get("/forme/find/all", (req, res, next) =>{ // returns all Athletes
    Forma.find().then((forme: any) =>{
        res.status(201).json({'message': "Success!", 'forme': forme});
    });
});

router.post("/forme/find/byname", (req, res, next) =>{ // returns Athletes by Discipline
    var ime = req.body.ime;
    Forma.findOne({ime: ime}).then((forma: any) =>{
        res.status(201).json({'message': "Success!", 'forma': forma});
    });
});

router.post("/sportisti/search", (req, res, next) =>{ // returns all Athletes
    var imeIPrezime = req.body.imeIPrezime;
    var nacionalnost = req.body.nacionalnost;
    var sport = req.body.sport;
    var disciplina = req.body.disciplina;
    var disciplina = disciplina.toLowerCase();
    var pol = req.body.pol;
    var samoOSvajaci = req.body.samoOSvajaci;

    if(samoOSvajaci != 0){
        Sportista.find({    
            imeIPrezime: new RegExp('.*' + imeIPrezime + '.*'),
            nacionalnost: new RegExp('.*' + nacionalnost + '.*'),
            sport: new RegExp('.*' + sport + '.*'), 
            discipline: new RegExp('.*' + disciplina + '.*'), 
            pol:  new RegExp('.*' + pol + '.*'), 
            brUkupno: { $gte: 1 }})
            .then((sportisti: any) =>{
                res.status(201).json({'message': "Success!", 'sportisti': sportisti});
            });
    }else{
        Sportista.find({    
            imeIPrezime: new RegExp('.*' + imeIPrezime + '.*'),
            nacionalnost: new RegExp('.*' + nacionalnost + '.*'), 
            sport: new RegExp('.*' + sport + '.*'), 
            discipline: new RegExp('.*' + disciplina + '.*'), 
            pol:  new RegExp('.*' + pol + '.*')}).then((sportisti: any) =>{
                res.status(201).json({'message': "Success!", 'sportisti': sportisti});
            });
    }
    
});



router.post("/sportovi/create", (req, res, next) => {
    var ime = req.body.ime;
    Sport.findOne({ime: ime}).then((s: any) => {
        if(s){
            res.json({'message': "Sport with that username already exists!"});
        }else{
                const sport = new Sport({
                    ime: ime,
                    discipline: []
                });

                console.log("Sport Added!");
                sport.save()
                .then((result: any) => {
                    res.status(201).json({
                        message: "Success!"
                    });
                });
            }
    });       
});

router.post("/lokacije/create", (req, res, next) => {
    var ime = req.body.ime;
    Lokacija.findOne({ime: ime}).then((s: any) => {
        if(s){
            res.json({'message': "Lokacija with that username already exists!"});
        }else{
                const lokacija = new Lokacija({
                    ime: ime
                });

                console.log("Lokacija Added!");
                lokacija.save()
                .then((result: any) => {
                    res.status(201).json({
                        message: "Success!"
                    });
                });
            }
    });       
});

router.post("/discipline/create", (req, res, next) => {
    var sport = req.body.sport;
    var naziv = req.body.naziv;
    var individualni = req.body.individualni;

    Disciplina.findOne({naziv: naziv, sport: sport}).then((d: any) => {
        if(d){
            res.json({'message': "Discipline with that name already exists!"});
        }else{
                const disciplina= new Disciplina({
                    sport: sport,
                    naziv: naziv,
                    individualni: individualni
                });

                console.log("Disciplina Added!");
                disciplina.save()
                .then((result: any) => {
                    Sport.updateOne({ ime: sport}, { $push: { discipline: naziv } })
                    .then((s: any) => {
                        res.status(201).json({
                            message: "Success!"
                        });
                    });
                });
            }
    });       
});

router.get("/sportovi/find/all", (req, res, next) =>{ // returns all Sports
    Sport.find().then((sportovi: any) =>{
        res.status(201).json({'message': "Success!", 'sportovi': sportovi});
    });
});

router.get("/discipline/find/all", (req, res, next) =>{ // returns all Disciplines
    Disciplina.find().then((discipline: any) =>{
        res.status(201).json({'message': "Success!", 'discipline': discipline});
    });
});

router.post("/discipline/find/bysport", (req, res, next) =>{ // returns all Disciplines
    var sport = req.body.sport;
    
    Disciplina.find({sport: sport}).then((discipline: any) =>{
        res.status(201).json({'message': "Success!", 'discipline': discipline});
    });
});

router.get("/discipline/find/takmfalse", (req, res, next) =>{ // returns list of unapproved korisniks
    Disciplina.find({takM: false}).then((discipline: any) =>{
        res.status(201).json({'message': "Success!", 'discipline': discipline});
    });
});

router.get("/discipline/find/takwfalse", (req, res, next) =>{ // returns list of unapproved korisniks
    Disciplina.find({takW: false}).then((discipline: any) =>{
        res.status(201).json({'message': "Success!", 'discipline': discipline});
    });
});

router.get("/discipline/find/takmtrue", (req, res, next) =>{ // returns list of unapproved korisniks
    Disciplina.find({takM: true}).then((discipline: any) =>{
        res.status(201).json({'message': "Success!", 'discipline': discipline});
    });
});

router.get("/discipline/find/takwtrue", (req, res, next) =>{ // returns list of unapproved korisniks
    Disciplina.find({takW: true}).then((discipline: any) =>{
        res.status(201).json({'message': "Success!", 'discipline': discipline});
    });
});

router.get("/tipoviforme/find/all", (req, res, next) =>{ // returns all Disciplines
    TipForme.find().then((tipoviforme: any) =>{
        res.status(201).json({'message': "Success!", 'tipoviforme': tipoviforme});
    });
});

router.get("/takmicenja/find/all", (req, res, next) =>{ // returns all Disciplines
    Takmicenje.find().then((takmicenja: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenja': takmicenja});
    });
});

router.get("/takmicenja/find/napravljena", (req, res, next) =>{ // returns all Disciplines
    Takmicenje.find({formirano: false, zavrseno: false}).then((takmicenja: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenja': takmicenja});
    });
});

router.get("/takmicenja/find/formirana", (req, res, next) =>{ // returns all Disciplines
    Takmicenje.find({formirano: true, zavrseno: false}).then((takmicenja: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenja': takmicenja});
    });
});

router.get("/takmicenja/find/zavrsena", (req, res, next) =>{ // returns all Disciplines
    Takmicenje.find({formirano: true, zavrseno: true}).then((takmicenja: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenja': takmicenja});
    });
});

router.post("/takmicenja/find/bezpocetka/bydelegat", (req, res, next) =>{ // returns all Disciplines
    var delegat = req.body.delegat;
    Takmicenje.find({formirano: true, zavrseno: false, pocetak: "", delegat: delegat}).then((takmicenja: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenja': takmicenja});
    });
});

router.post("/takmicenja/find/sapocetkom/bydelegat", (req, res, next) =>{ // returns all Disciplines
    var delegat = req.body.delegat;
    Takmicenje.find({formirano: true, zavrseno: false, pocetak: {$ne: ""}, delegat: delegat}).then((takmicenja: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenja': takmicenja});
    });
});

router.post("/takmicenja/update/pocetak", (req, res, next) =>{ // returns all Disciplines
    var ime = req.body.ime;
    var pocetak = req.body.pocetak;
    var lokacija = req.body.lokacija;
    Takmicenje.findOne({lokacija: lokacija, pocetak: pocetak}).then((tak: any) => {
        if(!tak){
            Takmicenje.updateOne({ime: ime}, {$set: {pocetak: pocetak}}).then((t: any) =>{
                res.status(201).json({'message': "Success!"});
            });
        }else{
            res.status(201).json({'message': "Another Takmicenje has same pocetak time and location!"});
        }
    });
});

router.get("/lokacije/find/all", (req, res, next) =>{ // returns all Lokacije
    Lokacija.find().then((lokacije: any) =>{
        res.status(201).json({'message': "Success!", 'lokacije': lokacije});
    });
});

//drugi deo projekta - obrada forma, prijava takmicenje

router.post("/sportisti/create", (req, res, next) => {
    var imeIPrezime = req.body.imeIPrezime;
    var pol = req.body.pol;
    var nacionalnost = req.body.nacionalnost;
    var sport = req.body.sport;
    var discipline = req.body.discipline;


    Sportista.findOne({imeIPrezime: imeIPrezime}).then((f: any) => {
        if(f){
            res.json({'message': "Sportista with that imeIPrezime already exists!"});
        }else{
                const sportista= new Sportista({
                    imeIPrezime: imeIPrezime,
                    pol: pol,
                    nacionalnost: nacionalnost,
                    sport: sport,
                    discipline: discipline,
                    rang: 0,
                    brZlatnih: 0,
                    brSrebrnih: 0,
                    brBronzanih: 0,
                    brUkupno: 0,
                    prihvacen: false
                });

                console.log("Sportista Added!");
                sportista.save()
                .then((s: any) => {
                    Zemlja.updateOne({skraceno: nacionalnost}, {  $inc: { brSportista: 1 } }).then((da: any) =>{  
                        res.status(201).json({
                            message: "Success!"
                        });
                    });
                });
            }
    });       
});

router.post("/takmicenja/push/sportista", (req, res, next) => {
    var imeIPrezime = req.body.imeIPrezime;
    var ime = req.body.ime;


    Takmicenje.updateOne({ime: ime}, {$push: {sportisti: imeIPrezime}}).then((f: any) => {
        console.log("Takmicar added to Takmicenje.");
        Prijava.updateOne({imeIPrezime: imeIPrezime, takmicenje: ime}, {$set: {prihvacena: true}}).then((r: any) =>{
            Prijava.find({takmicenje: ime, prihvacena: false}).then((prijave: any) =>{
                res.status(201).json({'message': "Success!", 'prijave': prijave});
            });
        });
    });       
});

router.post("/takmicenja/formiraj", (req, res, next) => {
    
    var ime = req.body.ime;


    Takmicenje.updateOne({ime: ime}, {$set: {formirano: true}}).then((f: any) => {
        console.log("Takmicenje Formirano!");
        res.status(201).json({
            message: "Success!"
        });
    });       
});


router.post("/forme/create", (req, res, next) => {
    var ime = req.body.ime;
    var tip = req.body.tip;
    var minIgraca = req.body.minIgraca;
    var maxIgraca = req.body.maxIgraca;
    var brRundi = req.body.brRundi;
    var stotinke = req.body.stotinke;
    var minuti = req.body.minuti;
    var casovi = req.body.casovi;


    Forma.findOne({ime: ime}).then((f: any) => {
        if(f){
            res.json({'message': "Form with that name already exists!"});
        }else{
                const forma= new Forma({
                    ime: ime,
                    tip: tip,
                    minIgraca: minIgraca,
                    maxIgraca: maxIgraca,
                    brRundi: brRundi,
                    stotinke: stotinke,
                    minuti: minuti,
                    casovi: casovi,
                });

                console.log("Forma Added!");
                forma.save()
                .then((s: any) => {
                    res.status(201).json({
                        message: "Success!"
                    });
                });
            }
    });       
});

router.post("/takmicenja/create", (req, res, next) => {
    var ime = req.body.ime;
    var format = req.body.format;
    var pol = req.body.pol;
    var sport = req.body.sport;
    var disciplina = req.body.disciplina;
    var delegat = req.body.delegat;
    var lokacija = req.body.lokacija;


    Takmicenje.findOne({ime: ime}).then((t: any) => {
        if(t){
            res.json({'message': "Takmicenje with that name already exists!"});
        }else{
                const takmicenje = new Takmicenje({
                    ime: ime,
                    format: format,
                    pol: pol,
                    sport: sport,
                    disciplina: disciplina,
                    pocetak: "",
                    kraj: "",
                    lokacija: lokacija,
                    delegat: delegat,
                    sportisti: [],
                    prvoMesto: "",
                    drugoMesto: "",
                    treceMesto: "",
                    formirano: false,
                    zavrseno: false,
                    
                });

                console.log("Takmicenje Added!");
                takmicenje.save()
                .then((result: any) => {
                    Korisnik.updateOne({username: delegat}, {  $inc: { brTakmicenja: 1 }, $push: { takmicenja: ime} })
                    .then((result2: any) =>{
                        if(pol == 'm'){
                        Disciplina.updateOne({ naziv: disciplina}, { $set: { takM: true } })
                        .then((s: any) => {
                            res.status(201).json({
                                message: "Success!"
                            });
                        });
                        }else{
                            Disciplina.updateOne({ naziv: disciplina}, { $set: { takW: true } })
                            .then((s: any) => {
                                res.status(201).json({
                                    message: "Success!"
                                });
                            });
                        }
                    });
                });
            }
    });       
});

router.post("/prijave/create", (req, res, next) => {
    var imeIPrezime = req.body.imeIPrezime;
    var nacionalnost = req.body.nacionalnost;
    var takmicenje = req.body.takmicenje;


    Prijava.findOne({imeIPrezime: imeIPrezime, takmicenje: takmicenje}).then((f: any) => {
        if(f){
            res.json({'message': "Ovaj sportista je vec prijavljen za ovo takmicenje!"});
        }else{
                const prijava= new Prijava({
                    imeIPrezime: imeIPrezime,
                    nacionalnost: nacionalnost,
                    takmicenje: takmicenje,
                    prihvacena: false
                });

                console.log("Prijava Added!");
                prijava.save()
                .then((s: any) => {
                    res.status(201).json({
                        message: "Success!"
                    });
                });
            }
    });       
});

router.post("/takmicenja/find/byime", (req, res, next) =>{ // returns Prijave by Takmicenje
    var ime = req.body.ime;
    Takmicenje.findOne({ime: ime}).then((takmicenje: any) =>{
        res.status(201).json({'message': "Success!", 'takmicenje': takmicenje});
    });
});

router.post("/prijave/find/bytakmicenje", (req, res, next) =>{ // returns Prijave by Takmicenje
    var takmicenje = req.body.takmicenje;
    Prijava.find({takmicenje: takmicenje, prihvacena: false}).then((prijave: any) =>{
        res.status(201).json({'message': "Success!", 'prijave': prijave});
    });
});


//treci deo projekta vezan za rezultate

router.post("/sportisti/update/zlatna", (req, res, next) => {
    var imeIPrezime = req.body.imeIPrezime;
    Sportista.updateOne({imeIPrezime: imeIPrezime}, {$inc: {brZlatnih: 1, brUkupno: 1}}).then((f: any) => {
        Sportista.findOne({imeIPrezime: imeIPrezime}).then((sportista: any) => {
            console.log("Zlatna Medlja incremented!");
            res.status(201).json({
                message: "Success!", 'zemlja': sportista.nacionalnost
            });
        
        });  
    });       
});

router.post("/sportisti/update/srebrna", (req, res, next) => {
    var imeIPrezime = req.body.imeIPrezime;
    Sportista.updateOne({imeIPrezime: imeIPrezime}, {$inc: {brSrebrnih: 1, brUkupno: 1}}).then((f: any) => {
        Sportista.findOne({imeIPrezime: imeIPrezime}).then((sportista: any) => {
            console.log("Srebrna Medlja incremented!");
            res.status(201).json({
                message: "Success!", 'zemlja': sportista.nacionalnost
            });
        
        });  
    });       
});

router.post("/sportisti/update/bronzana", (req, res, next) => {
    var imeIPrezime = req.body.imeIPrezime;
    Sportista.updateOne({imeIPrezime: imeIPrezime}, {$inc: {brBronzanih: 1, brUkupno: 1}}).then((f: any) => {
        Sportista.findOne({imeIPrezime: imeIPrezime}).then((sportista: any) => {
            console.log("Bronzana Medlja incremented!");
            res.status(201).json({
                message: "Success!", 'zemlja': sportista.nacionalnost
            });
        
        });  
    });       
});

//povecaj medalju zemljama

router.post("/zemlje/update/zlatna", (req, res, next) => {
    var zemlja = req.body.zemlja;
    Zemlja.updateOne({skraceno: zemlja}, {$inc: {brZlatnih: 1, brUkupno: 1}}).then((f: any) => {
            console.log("Zlatna Medlja incremented!");
            res.status(201).json({
                message: "Success!"
            });
         
    });       
});

router.post("/zemlje/update/srebrna", (req, res, next) => {
    var zemlja = req.body.zemlja;
    Zemlja.updateOne({skraceno: zemlja}, {$inc: {brSrebrnih: 1, brUkupno: 1}}).then((f: any) => {
            console.log("Srebrna Medlja incremented!");
            res.status(201).json({
                message: "Success!"
            });
         
    });       
});

router.post("/zemlje/update/bronzana", (req, res, next) => {
    var zemlja = req.body.zemlja;
    Zemlja.updateOne({skraceno: zemlja}, {$inc: {brBronzanih: 1, brUkupno: 1}}).then((f: any) => {
            console.log("Bronzana Medlja incremented!");
            res.status(201).json({
                message: "Success!"
            });
         
    });       
});

router.post("/takmicenja/zavrsi", (req, res, next) => {
    var ime = req.body.ime;
    var prvi = req.body.prvi;
    var drugi = req.body.drugi;
    var treci = req.body.treci;
    Takmicenje.updateOne({ime: ime}, {$set: {zavrseno: true, prvoMesto: prvi, drugoMesto: drugi, treceMesto: treci}}).then((f: any) => {
            console.log("Takmicenje Zavrseno!");
            res.status(201).json({
                message: "Success!"
            });
         
    });       
});


//Funkcije koje pomazu programeru da azurira bazu, jako verovatno se nece koristiti u samom projektu, niti ce biti povezani s frontom.

//dev tools
router.post("/discipline/dodaj/proveru/takmicenja", (req, res, next) => {
   
    Disciplina.updateMany({ }, {$set: { takM: false, takW: false} })
            .then((result: any) => {
                console.log(result);
                res.json({message: "Disciplinama dodati booleani!"});
            });
});

router.post("/sportisti/dodaj/proveru/prihvacen", (req, res, next) => {
   
    Sportista.updateMany({ }, {$set: { prihvacen: false } })
            .then((result: any) => {
                console.log(result);
                res.json({message: "Spotistima dodati booleani!"});
            });
});

router.post("/tipforme/create", (req, res, next) => {
    var ime = req.body.ime;
    TipForme.findOne({ime: ime}).then((s: any) => {
        if(s){
            res.json({'message': "TipForme with that username already exists!"});
        }else{
                const tipForme = new TipForme({
                    ime: ime
                });

                console.log("TipForme Added!");
                tipForme.save()
                .then((result: any) => {
                    res.status(201).json({
                        message: "Success!"
                    });
                });
            }
    });       
});

router.post("/sportisti/ocisti/medlaje", (req, res, next) => {
    Sportista.updateMany({}, {$set: {brZlatnih: 0, brSrebrnih: 0, brBronzanih: 0, brUkupno: 0}}).then((f: any) => { 
            console.log("Medalje Ociscene! - Sportisti");
            res.status(201).json({
                message: "Success!"
            });
    });       
});

router.post("/zemlje/ocisti/medlaje", (req, res, next) => {
    Zemlja.updateMany({}, {$set: {brZlatnih: 0, brSrebrnih: 0, brBronzanih: 0, brUkupno: 0}}).then((f: any) => { 
            console.log("Medalje Ociscene! - Zemlje");
            res.status(201).json({
                message: "Success!"
            });
    });       
});


module.exports = router;
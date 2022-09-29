import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Disciplina } from 'src/app/models/disciplina';
import { Sport } from 'src/app/models/sport';
import { Sportista } from 'src/app/models/sportista';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-prijava-sportista',
  templateUrl: './prijava-sportista.component.html',
  styleUrls: ['./prijava-sportista.component.css']
})
export class PrijavaSportistaComponent implements OnInit {

  message: string;
  message2: string;

  pokaziSportiste: boolean;

  sviSportisti: Sportista[];


  svaTakmicenja: Takmicenje[];
  odabranoTakmicenje: Takmicenje;
  disciplina: string;
  pol: string;
  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("vodja")){
      this.router.navigate(["/"]);
      return;
    }
    this.getAllTakmicenja();
    this.pokaziSportiste = false;
    this.odabranoTakmicenje = null;
    this.disciplina = "";
    this.sviSportisti = [];
  }

  getAllTakmicenja(){
    this.servis.getCreatedTakmicenja().subscribe((data) => {
      this.svaTakmicenja = data.takmicenja;
    });
  }

  onSelectTakmicenje(takmicenje){
    this.odabranoTakmicenje = takmicenje.value;
    this.disciplina = this.odabranoTakmicenje.disciplina;
    this.pol = this.odabranoTakmicenje.pol;
    this.getSportistiByDisciplina(this.disciplina);
    this.pokaziSportiste = true;
    console.log(this.pol);
  }

  getSportistiByDisciplina(disciplina){
    this.servis.getSportistiByDisciplina(disciplina, this.pol).subscribe((data) => {
      this.sviSportisti = data.sportisti;
    });
  }

  onPrijavaSportista(form: NgForm){
    var imeIPrezime = form.value.imeIPrezime;
    var takmicenje = this.odabranoTakmicenje.ime;
    var disciplina = this.odabranoTakmicenje.disciplina;
    
    if(!imeIPrezime || !takmicenje){
      this.message = "Morate popuniti sva polja forme!";
      this.message2 =  "";
      return;
    }
    
    this.servis.addPrijava(imeIPrezime, takmicenje).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Sportista Successfully Prijavljen!";
        form.controls['takmicenje'].reset()
        form.controls['imeIPrezime'].reset()
        this.sviSportisti = [];
        this.pokaziSportiste = false;        
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });

  }
}

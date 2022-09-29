import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Disciplina } from 'src/app/models/disciplina';
import { Forma } from 'src/app/models/forma';
import { Korisnik } from 'src/app/models/korisnik';
import { Sport } from 'src/app/models/sport';

@Component({
  selector: 'app-add-sportista',
  templateUrl: './add-sportista.component.html',
  styleUrls: ['./add-sportista.component.css']
})
export class AddSportistaComponent implements OnInit {

  message: string;
  message2: string;

  disciplineSporta: Disciplina[];
  pokaziDiscipline: boolean;

  odabraneDiscipline: string[];

  sviSportovi: Sport[];
  odabraniSport: string[];

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("vodja")){
      this.router.navigate(["/"]);
      return;
    }
    this.getAllSports();
    this.pokaziDiscipline = false;
    this.odabraneDiscipline = [];
  }

  getAllSports(){
    this.servis.getAllSportovi().subscribe((data) => {
      this.sviSportovi = data.sportovi;
    });
  }

  onSelectSport(sport){
    this.odabraniSport = sport.value;
    this.getDisciplineBySport(this.odabraniSport);
    this.odabraneDiscipline = [];
  }

  getDisciplineBySport(sport){
    this.servis.getDisciplineBySport(sport).subscribe((data) => {
      this.disciplineSporta = data.discipline;
      this.pokaziDiscipline = true;
    });
  }

  onAddSportista(form: NgForm){


    var imeIPrezime = form.value.imeIPrezime;
    var pol = form.value.pol;
    var nacionalnost = this.servis.getCurNacionalnost();
    var sport = form.value.sport;
    
    if(!imeIPrezime || !pol || !nacionalnost || !sport || (this.odabraneDiscipline.length < 1)){
      this.message = "Morate popuniti sva polja forme!";
      this.message2 =  "";
      return;
    }

    this.servis.addSportista(imeIPrezime, pol, nacionalnost, sport, this.odabraneDiscipline).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Sportista Successfully Added!";
        form.controls['odabraneDiscipline'].reset()
        form.controls['sport'].reset()
        this.odabraneDiscipline = [];        
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });

  }
}

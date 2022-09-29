import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Disciplina } from 'src/app/models/disciplina';
import { Forma } from 'src/app/models/forma';
import { Korisnik } from 'src/app/models/korisnik';
import { Lokacija } from 'src/app/models/lokacija';
import { Sport } from 'src/app/models/sport';
import { TipForme } from 'src/app/models/tipforme';

@Component({
  selector: 'app-add-takmicenje',
  templateUrl: './add-takmicenje.component.html',
  styleUrls: ['./add-takmicenje.component.css']
})
export class AddTakmicenjeComponent implements OnInit {

  message: string;
  message2: string;

  odabraniPol: string;

  discipline: Disciplina[];
  pokaziDiscipline: boolean;

  availableDelgati: Korisnik[];

  sveForme: Forma[];
  sveLokacije: Lokacija[];

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("organizator")){
      this.router.navigate(["/"]);
      return;
    }
    this.getAllForme();
    this.getAllLokacije();
    this.getAvailableDelegati();
    this.pokaziDiscipline = false;
  }

  onSelectPol(pol){
    this.odabraniPol = pol.value;
    if(!this.odabraniPol.localeCompare("m")){
      this.getAllMDiscipline();
      this.pokaziDiscipline = true;
    }else if(!this.odabraniPol.localeCompare("w")){
      this.getAllWDiscipline();
      this.pokaziDiscipline = true;
    }else{
      this.pokaziDiscipline = false;
      this.discipline = [];
    }
  }

  getAllWDiscipline(){
    this.servis.getSlobodneWDiscipline().subscribe((data) => {
      this.discipline = data.discipline;
    });
  }

  getAllMDiscipline(){
    this.servis.getSlobodneMDiscipline().subscribe((data) => {
      this.discipline = data.discipline;
    });
  }

  getAllForme(){
    this.servis.getAllForme().subscribe((data) => {
      this.sveForme = data.forme;
    });
  }

  getAllLokacije(){
    this.servis.getAllLokacije().subscribe((data) => {
      this.sveLokacije = data.lokacije;
    });
  }

  getAvailableDelegati(){
    this.servis.getAvailableDelegats().subscribe((data) => {
      this.availableDelgati = data.delegati;
    });
  }

  onAddTakmicenje(form: NgForm){
    var ime = form.value.ime;
    var forma = form.value.forma;
    var lokacija = form.value.lokacija;
    var pol = form.value.pol;
    var delegat = form.value.delegat;
    var d: Disciplina = form.value.disc;

    if(!d || !ime || !forma || !pol || !lokacija){
      this.message = "Morate popuniti sva polja forme!";
      this.message2 =  "";
      return;
    }

    var sport = d.sport;
    var discipl = d.naziv;

    this.servis.addTakmicenje(ime, forma, pol, sport, discipl, delegat, lokacija).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Takmicenje Successfully Added!";
        form.controls['disc'].reset()
        form.controls['delegat'].reset()
        this.getAvailableDelegati();
        if(!this.odabraniPol.localeCompare("m")){
          this.getAllMDiscipline();
          this.pokaziDiscipline = true;
        }else if(!this.odabraniPol.localeCompare("w")){
          this.getAllWDiscipline();
          this.pokaziDiscipline = true;
        }else{
          this.pokaziDiscipline = false;
          this.discipline = [];
        }
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Forma } from 'src/app/models/forma';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-odaveri-takmicenje',
  templateUrl: './odaveri-takmicenje.component.html',
  styleUrls: ['./odaveri-takmicenje.component.css']
})
export class OdaveriTakmicenjeComponent implements OnInit {


  message: string;
  message2: string;
  svaTakmicenja: Takmicenje[];
  odabranoTakmicenje: Takmicenje;

  sportiste: string[];
  forma: Forma;
  rangoviSportista: number[] = [];


  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("delegat")){
      this.router.navigate(["/"]);
      return;
    }

    this.getAllTakmicenja();
    this.odabranoTakmicenje = null;
  }

  getAllTakmicenja(){
    this.servis.getTakmicenjaSaPocetkomByDelegat().subscribe((data) => {
      this.svaTakmicenja = data.takmicenja;
    });
  }

  getFormaByIme(ime){
    this.servis.getFormaByIme(ime).subscribe((data) => {
      this.forma = data.forma;
      this.servis.setCurSportisti(this.sportiste);
      this.servis.setCurForma(this.forma);
      this.servis.setCurTakmicenje(this.odabranoTakmicenje);
    });
  }

  dohvatiRangoveSportista(kurzor){
    this.servis.getSportistinRang(this.sportiste[kurzor]).subscribe((data) =>{
      this.rangoviSportista[kurzor] = data.rang;
    });
  }

  onSelectTakmicenje(takmicenje){
    this.odabranoTakmicenje = takmicenje.value;
    this.sportiste = this.odabranoTakmicenje.sportisti;

    for(var i=0; i<this.sportiste.length; i++){
      this.dohvatiRangoveSportista(i);
    }
    this.getFormaByIme(this.odabranoTakmicenje.format);
  }

  onUnosVremena(form: NgForm){
    this.servis.setCurRangovi(this.rangoviSportista);

    if(!this.forma.tip.localeCompare("trka")){
      this.router.navigate(["/delegat/unesi/rezultate/trka"]);  
    }else if(!this.forma.tip.localeCompare("daljina-visina")){
      this.router.navigate(["/delegat/unesi/rezultate/daljina"]);  
    }else if(!this.forma.tip.localeCompare("streljastvo")){
      this.router.navigate(["/delegat/unesi/rezultate/streljastvo"]);  
    }else if(!this.forma.tip.localeCompare("1 na 1")){
      this.router.navigate(["/delegat/unesi/rezultate/tenis"]);  
    }
  }

}

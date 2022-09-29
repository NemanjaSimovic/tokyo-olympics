import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Forma } from 'src/app/models/forma';
import { Sportista } from 'src/app/models/sportista';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-unesi-rezultate',
  templateUrl: './unesi-rezultate.component.html',
  styleUrls: ['./unesi-rezultate.component.css']
})
export class UnesiRezultateComponent implements OnInit {

  message: string;

  takmicenje: Takmicenje;

  sportiste: string[] = [];

  forma: Forma;
  
  brIgraca: number;
  tipForme: string;

  trenutnaRunda: number;
  brRundi: number;

  prikaziStotinke: boolean;
  prikaziMinute: boolean;
  prikaziCasove: boolean;

  igrKurzor: number;
  rundKurzor: number;
  
  rezultati:number[] = [];

  pomocnikSportista: string;
  pomocnikRezultat: number;

  krajTakmicenja: boolean; 

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("delegat")){
      this.router.navigate(["/"]);
      return;
    }
    this.krajTakmicenja = false;
    this.message = "";
    this.igrKurzor = 0;
    this.rundKurzor = 0;
    this.obradiFormu();
    this.obradiSportiste();
    this.inicijalizujRezultate();
    this.takmicenje = this.servis.getCurTakmicenje();
    console.log(this.takmicenje);
  }

  obradiFormu(){
    this.forma = this.servis.getCurForma();
    this.brRundi = this.forma.brRundi;

    this.prikaziStotinke = this.forma.stotinke;
    this.prikaziMinute = this.forma.minuti;
    this.prikaziCasove = this.forma.casovi;
  }

  obradiSportiste(){
    this.sportiste = this.servis.getCurSportisti();
    this.brIgraca = this.sportiste.length;
    console.log(this.sportiste);
    console.log(this.brIgraca);
  }

  inicijalizujRezultate(){
    for(var i = 0; i<this.brIgraca; i++){
      this.rezultati[i] = Number.MAX_VALUE;
    }
  }



  povecajZlatnu(){
    this.servis.povecajZlatnuSportisti(this.sportiste[0]).subscribe((data) => {
      var zem = data.zemlja;
      this.servis.povecajZlatnuZemlji(zem).subscribe((data2) => {
        console.log(data2.message);
      });
    });
  }

  povecajSrebrnu(){
    this.servis.povecajSrebrnuSportisti(this.sportiste[1]).subscribe((data) => {
      var zem = data.zemlja;
      this.servis.povecajSrebrnuZemlji(zem).subscribe((data2) => {
        console.log(data2.message);
      });
    });
  }

  povecajBronzanu(){
    this.servis.povecajBronzanuSportisti(this.sportiste[2]).subscribe((data) => {
      var zem = data.zemlja;
      this.servis.povecajBronzanuZemlji(zem).subscribe((data2) => {
        console.log(data2.message);
      });
    });
  }

  zavrsiTakmicenje(){
    this.servis.zavrsiTakmicenje(this.takmicenje.ime, this.sportiste[0], this.sportiste[1], this.sportiste[2]).subscribe((data) => {
      console.log("KRAJ");
    })
  }


  
  izracunajRezultatIgraca(stotinke, sekunde, minuti, casovi){
    var rez = stotinke + sekunde*100 + minuti*100*60 + casovi*100*60*60;

    if(rez < this.rezultati[this.igrKurzor]){
      this.rezultati[this.igrKurzor] = rez;
    }

    this.igrKurzor++;
    if(this.igrKurzor == this.brIgraca){
      this.igrKurzor = 0;
      this.rundKurzor++;
      console.log(this.sportiste);
      console.log(this.rezultati);
    }
  }

  sortirajRezultate(){
    for(var i=0; i<this.brIgraca; i++){
      for(var j=i+1; j<this.brIgraca; j++){
        if(this.rezultati[i] > this.rezultati[j]){
          this.pomocnikRezultat = this.rezultati[j];
          this.pomocnikSportista = this.sportiste[j];
          this.rezultati[j] = this.rezultati[i];
          this.sportiste[j] = this.sportiste[i];
          this.rezultati[i] = this.pomocnikRezultat;
          this.sportiste[i] = this.pomocnikSportista;
        }
      }
    }
  }

  kraj(form: NgForm){
    if(this.krajTakmicenja){
      console.log("Takmicenje je zavrseno!");
      return;
    }

    this.sortirajRezultate();
    
    this.povecajZlatnu();
    this.povecajSrebrnu();
    this.povecajBronzanu();

    this.zavrsiTakmicenje();

    this.krajTakmicenja = true;
    this.message = "Prvo mesto: " + this.sportiste[0] + ", Drugo Mesto: " + this.sportiste[1] + ", Trece mesto: " + this.sportiste[2];
  }


  onZavrsiRundu(form: NgForm){
    if(this.rundKurzor == this.brRundi){
      this.kraj(form);
      return;
    }
    var stotinke;
    var sekunde;
    var minuti;
    var casovi;

    if(this.prikaziStotinke){
      if(!form.value.stotinke){
        stotinke = 0;
      }else{
        stotinke = form.value.stotinke;
        if(stotinke > 99 || stotinke < 0){
          console.log("Invalid input!");
          console.log("Available values for stotinke is 0-99");
          return;
        }
      }
    }else{
      stotinke = 0;
    }

    if(!form.value.sekunde){
      sekunde = 0;
    }else{
      sekunde = form.value.sekunde;
      if(sekunde > 59 || sekunde < 0){
        console.log("Invalid input!");
        console.log("Available values for sekunde is 0-59");
        return;
      }
    }

    if(this.prikaziMinute){
      if(!form.value.minuti){
        minuti = 0;
      }else{
        minuti = form.value.minuti;
        if(minuti > 99 || minuti < 0){
          console.log("Invalid input!");
          console.log("Available values for minuti is 0-99");
          return;
        }
      }
    }else{
      minuti = 0;
    }

    if(this.prikaziCasove){
      if(!form.value.casovi){
        casovi = 0;
      }else{
        casovi = form.value.casovi;
        if(casovi > 99 || casovi < 0){
          console.log("Invalid input!");
          console.log("Available values for casovi is 0-99");
          return;
        }
      }
    }else{
      casovi = 0;
    }

    this.izracunajRezultatIgraca(stotinke, sekunde, minuti, casovi);
    if(this.rundKurzor == this.brRundi){
      this.kraj(form);
      return;
    }
  }

}

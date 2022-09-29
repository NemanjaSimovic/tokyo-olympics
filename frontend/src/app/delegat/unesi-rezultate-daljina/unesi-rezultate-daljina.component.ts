import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Forma } from 'src/app/models/forma';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-unesi-rezultate-daljina',
  templateUrl: './unesi-rezultate-daljina.component.html',
  styleUrls: ['./unesi-rezultate-daljina.component.css']
})
export class UnesiRezultateDaljinaComponent implements OnInit {
  message: string;

  takmicenje: Takmicenje;

  sportiste: string[] = [];

  forma: Forma;
  
  brIgraca: number;
  tipForme: string;

  trenutnaRunda: number;
  brRundi: number;

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
  }

  obradiSportiste(){
    this.sportiste = this.servis.getCurSportisti();
    this.brIgraca = this.sportiste.length;
    console.log(this.sportiste);
    console.log(this.brIgraca);
  }

  inicijalizujRezultate(){
    for(var i = 0; i<this.brIgraca; i++){
      this.rezultati[i] = 0;
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


  
  izracunajRezultatIgraca(santimetri, metri){
    var rez = santimetri + metri*100;

    if(rez > this.rezultati[this.igrKurzor]){
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
        if(this.rezultati[i] < this.rezultati[j]){
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
    var santimetri;
    var metri;

    if(!form.value.santimetri){
      santimetri = 0;
    }else{
      santimetri = form.value.santimetri;
      if(santimetri > 99 || santimetri < 0){
        console.log("Invalid input!");
        console.log("Available values for santimetri is 0-99");
        return;
      }
    }

    if(!form.value.metri){
      metri = 0;
    }else{
      metri = form.value.metri;
      if(metri < 0){
        console.log("Invalid input!");
        console.log("Available values for metri is 0-99");
        return;
      }
    }

    this.izracunajRezultatIgraca(santimetri, metri);
    if(this.rundKurzor == this.brRundi){
      this.kraj(form);
      return;
    }
  }

}

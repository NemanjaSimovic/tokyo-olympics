import { ProviderAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Forma } from 'src/app/models/forma';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-unesi-rezultate-streljastvo',
  templateUrl: './unesi-rezultate-streljastvo.component.html',
  styleUrls: ['./unesi-rezultate-streljastvo.component.css']
})
export class UnesiRezultateStreljastvoComponent implements OnInit {
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
  
  dodatnaRunda: boolean;
  dodatniKurzor: number;
  dodatnoOdigrao: number;
  
  negativniBroj: number;

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("delegat")){
      this.router.navigate(["/"]);
      return;
    }
    this.krajTakmicenja = false;
    this.dodatnaRunda = false;
    this.dodatniKurzor = 0;
    this.dodatnoOdigrao = 0;
    this.message = "";
    this.igrKurzor = 0;
    this.rundKurzor = 0;
    this.negativniBroj = -1;
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

  zameniDvaUnizu(kurzor1, kurzor2){
    this.pomocnikSportista = this.sportiste[kurzor1];
    this.sportiste[kurzor1] = this.sportiste[kurzor2];
    this.sportiste[kurzor2] = this.pomocnikSportista;

    this.pomocnikRezultat = this.rezultati[kurzor1];
    this.rezultati[kurzor1] = this.rezultati[kurzor2];
    this.rezultati[kurzor2] = this.pomocnikRezultat;
  }


  
  izracunajRezultatIgraca(brojPogodaka){
    var rez = brojPogodaka;

    // U ovu granu se ulazi ukoliko se igra dodatna runda!
    if(this.dodatnaRunda){
      console.log("Ovde sam!");
      if(this.dodatnoOdigrao==0){
        this.rezultati[this.dodatniKurzor] += rez;
        this.dodatniKurzor++;
        this.dodatnoOdigrao++;
        return;
      }else if(this.dodatnoOdigrao==1){
        console.log(rez);
        console.log(this.dodatniKurzor);
        this.rezultati[this.dodatniKurzor] += rez;
        this.dodatniKurzor--;
        this.dodatnoOdigrao--;
        console.log(this.rezultati[this.dodatniKurzor]);
        console.log(this.rezultati[this.dodatniKurzor+1]);
        if(this.rezultati[this.dodatniKurzor] == this.rezultati[this.dodatniKurzor+1]){
          this.message = "Ponovo izjednaceni, krece jos jedna dodatna runda!";
          return;
        }else if(this.rezultati[this.dodatniKurzor] < this.rezultati[this.dodatniKurzor+1]){
          this.zameniDvaUnizu(this.dodatniKurzor, this.dodatniKurzor+1);
          this.rezultati[this.dodatniKurzor] = this.negativniBroj--;
          this.rezultati[this.dodatniKurzor+1] = this.negativniBroj--;
          this.dodatnaRunda = false;
          this.kraj();
          return;
        }else{
          this.dodatnaRunda = false;
          this.rezultati[this.dodatniKurzor] = this.negativniBroj--;
          this.rezultati[this.dodatniKurzor+1] = this.negativniBroj--;
          this.kraj();
          return;
        }
      }
      return;
    }

    this.rezultati[this.igrKurzor] += rez;

    this.igrKurzor++;
    if(this.igrKurzor == this.brIgraca){
      this.igrKurzor = 0;
      this.rundKurzor++;
      console.log(this.sportiste);
      console.log(this.rezultati);
      if(this.rundKurzor == this.brRundi){
        this.sortirajRezultate();
        this.kraj();
        return;
      }
    }
  }


  kraj(){

    // Ovde ide provera ima li izjednacenih takmicara, i ima li potrebe za dodatnom rundom!
    if(this.rezultati[0] == this.rezultati[1]){
      this.dodatnaRunda = true;
      this.dodatniKurzor = 0;
      this.dodatnoOdigrao = 0;
      this.message = "Pocinje dodatna runda!";
      console.log(this.dodatnaRunda);
      console.log(this.dodatniKurzor);
      return;
    }else if(this.brIgraca > 2 && (this.rezultati[1] == this.rezultati[2])){
      this.dodatnaRunda = true;
      this.dodatniKurzor = 1;
      this.dodatnoOdigrao = 0;
      this.message = "Pocinje dodatna runda!";
      console.log(this.dodatnaRunda);
      console.log(this.dodatniKurzor);
      return;
    }else if(this.brIgraca > 3 && (this.rezultati[2] == this.rezultati[3])){
      this.dodatnaRunda = true;
      this.dodatniKurzor = 2;
      this.dodatnoOdigrao = 0;
      console.log(this.dodatnaRunda);
      console.log(this.dodatniKurzor);
      this.message = "Pocinje dodatna runda!";
      return;
    }
    
    // Azuriranje medalja, i adekvatnih falgova u samom takmicenju!
    this.povecajZlatnu();
    this.povecajSrebrnu();
    this.povecajBronzanu();

    this.zavrsiTakmicenje();

    // Obaveztavanje Takmicara da je takmicenje gotovo kao i ishod takmicenja!
    // Flag kraj takmicenja sluzi, da ukoliko korisnik nastavi da klikce dugme zavrsi rundu, da se nista ne izvrsava u pozadini, vec da samo dobije obavestenje tome u vidu poruke vidljive na frontu.
    this.krajTakmicenja = true;

    console.log(this.rezultati);
    
    if(this.brIgraca > 2){
      this.message = "Prvo mesto: " + this.sportiste[0] + ", Drugo Mesto: " + this.sportiste[1] + ", Trece mesto: " + this.sportiste[2];
    }else{
      this.message = "Prvo mesto: " + this.sportiste[0] + ", Drugo Mesto: " + this.sportiste[1];
    }
  }


  onZavrsiRundu(form: NgForm){
    if(this.krajTakmicenja){
      if(this.brIgraca > 2){
        this.message = "Takmicenje je zavrseno! " + "Prvo mesto: " + this.sportiste[0] + ", Drugo Mesto: " + this.sportiste[1] + ", Trece mesto: " + this.sportiste[2];
      }else{
        this.message = "Takmicenje je zavrseno! " + "Prvo mesto: " + this.sportiste[0] + ", Drugo Mesto: " + this.sportiste[1];
      }
      return;
    }
    var brojPogodaka;

    if(!form.value.brojPogodaka){
      brojPogodaka = 0;
    }else{
      brojPogodaka = form.value.brojPogodaka;
      if(brojPogodaka < 0){
        console.log("Invalid input!");
        console.log("Available values for santimetri is 0-99");
        return;
      }
    }

    this.izracunajRezultatIgraca(brojPogodaka);
  }

}

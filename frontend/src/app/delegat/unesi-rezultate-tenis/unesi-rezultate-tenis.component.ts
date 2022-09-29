import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Forma } from 'src/app/models/forma';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-unesi-rezultate-tenis',
  templateUrl: './unesi-rezultate-tenis.component.html',
  styleUrls: ['./unesi-rezultate-tenis.component.css']
})
export class UnesiRezultateTenisComponent implements OnInit {

  treceCetvrto: boolean;
  finale: boolean;

  message: string;

  takmicenje: Takmicenje;

  sportiste: string[] = [];
  rangoviSportista: number[] = [];

  forma: Forma;
  
  brIgraca: number;
  igracaUKolu: number;
  tipForme: string;

  igrKurzor: number;
  
  rezultati:number[] = [];

  pomocnikSportista: string;
  pomocnikRang: number;

  krajTakmicenja: boolean;

  prviSportista: string;
  drugiSportista: string;

  kolo: number;

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("delegat")){
      this.router.navigate(["/"]);
      return;
    }
    this.krajTakmicenja = false;
    this.message = "";
    this.igrKurzor = 0;
    this.kolo = 1;
    this.obradiFormu();
    this.obradiSportiste();
    this.takmicenje = this.servis.getCurTakmicenje();
    this.rangoviSportista = this.servis.getCurRangovi();
    console.log(this.sportiste);
    console.log(this.rangoviSportista);
    this.sortirajIgracePoRangu();
    console.log(this.sportiste);
    console.log(this.rangoviSportista);
    this.treceCetvrto = false;
    this.finale = false;

    this.prviSportista = this.sportiste[0];
    this.drugiSportista = this.sportiste[this.brIgraca - 1];
  }

  obradiFormu(){
    this.forma = this.servis.getCurForma();
  }

  obradiSportiste(){
    this.sportiste = this.servis.getCurSportisti();
    this.brIgraca = this.sportiste.length;
    this.igracaUKolu = this.sportiste.length;
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

  sortirajIgracePoRangu(){
    for(var i=0; i<this.brIgraca; i++){
      for(var j=i+1; j<this.brIgraca; j++){
        if(this.rangoviSportista[i] > this.rangoviSportista[j]){
          this.pomocnikRang = this.rangoviSportista[j];
          this.pomocnikSportista = this.sportiste[j];
          this.rangoviSportista[j] = this.rangoviSportista[i];
          this.sportiste[j] = this.sportiste[i];
          this.rangoviSportista[i] = this.pomocnikRang;
          this.sportiste[i] = this.pomocnikSportista;
        }
      }
    }
  }

  azurirajIgraceNakonMeca(prvi, drugi){
    //u slucaju da igrac s manjim rankom pobedi, zameniti mesto s igracem s jacim rankom.
    //u principu sortiramo niz igraca prema osvojenom mestu na takmicenju.
    if(prvi < drugi){
      this.pomocnikSportista = this.sportiste[this.igrKurzor];
      this.pomocnikRang = this.rangoviSportista[this.igrKurzor];
      this.sportiste[this.igrKurzor] = this.sportiste[this.igracaUKolu-this.igrKurzor-1];
      this.rangoviSportista[this.igrKurzor] = this.rangoviSportista[this.igracaUKolu-this.igrKurzor-1];
      this.sportiste[this.igracaUKolu-this.igrKurzor-1] = this.pomocnikSportista
      this.rangoviSportista[this.igracaUKolu-this.igrKurzor-1] = this.pomocnikRang;
      this.message = "Pobednik je: " + this.drugiSportista;
    }else{
      this.message = "Pobednik je: " + this.prviSportista;
    }

    this.igrKurzor++;

    //ovo je znak da je kolo upravo zavrseno i da se prelazi ili u iduce kolo ili u cetvrt finale.
    if(this.igrKurzor == (this.igracaUKolu/2)){
      console.log(this.sportiste);
      console.log(this.rangoviSportista);
      this.igracaUKolu = this.igracaUKolu / 2;
      this.igrKurzor = 0;
      this.kolo++;
      //kad se odigraju mecevi s 4 preostala igraca, pobednici idu u finale meca, a gubitnici u borbu za 3 mesto.
      if(this.igracaUKolu < 4){
        //prvo se igra borba za trece mesto, s toga je ovo podesavanje ovde.
        this.treceCetvrto = true;
        this.prviSportista = this.sportiste[2];
        this.drugiSportista = this.sportiste[3];
        return;
      }
    }
    //ovde podesavamo imena sportista narednog meca, u sustini nam znaci samo za lepotu frontend dela, i tako znamo za koji mec unosimo rezultate.
    this.prviSportista = this.sportiste[this.igrKurzor];
    this.drugiSportista = this.sportiste[this.igracaUKolu-this.igrKurzor-1];
  }

  

  onZavrsiRundu(form: NgForm){
    
    if(this.krajTakmicenja){
      this.message = "Takmicenje je zavrseno! " + "Prvo mesto: " + this.sportiste[0] + ", Drugo Mesto: " + this.sportiste[1] + ", Trece mesto: " + this.sportiste[2];
      return;
    }

    var brojSetovaPrvi;
    var brojSetovaDrugi;

    if(!form.value.brojSetovaPrvi){
      brojSetovaPrvi = 0;
    }else{
      brojSetovaPrvi = form.value.brojSetovaPrvi;
      if(brojSetovaPrvi < 0 || brojSetovaPrvi > 2){
        console.log("Invalid input!");
        console.log("Available values for setovi prvog igraca is 0-2");
        return;
      }
    }

    if(!form.value.brojSetovaDrugi){
      brojSetovaDrugi = 0;
    }else{
      brojSetovaDrugi = form.value.brojSetovaDrugi;
      if(brojSetovaDrugi < 0 || brojSetovaDrugi > 2){
        console.log("Invalid input!");
        console.log("Available values for setovi drugog igraca is 0-2");
        return;
      }
    }

    //s obzirom da se mec zavrsava kada prvi igrac skupi 2 seta, jedini moguci scenariji rezultata su 2-0, 2-1, 1-2, 0-2.
    if((brojSetovaDrugi !=2 && brojSetovaPrvi !=2)|| (brojSetovaDrugi ==2 && brojSetovaPrvi ==2)){
      console.log("Invalid input!");
      console.log("Tacno jedan igrac mora imati osvojena 2 seta!");
      return;
    }

    //mec za rece i cetvrto mesto.
    if(this.treceCetvrto){
      if(brojSetovaPrvi < brojSetovaDrugi){
        this.pomocnikSportista =  this.sportiste[2];
        this.pomocnikRang =  this.rangoviSportista[2];
        this.sportiste[2] = this.sportiste[3];
        this.rangoviSportista[2] = this.rangoviSportista[3];
        this.sportiste[3] = this.pomocnikSportista;
        this.rangoviSportista[3] = this.pomocnikRang;
        this.message = "Pobednik Meca za trece mesto je: " + this.drugiSportista;
      }else{
        this.message = "Pobednik Meca za trece mesto je: " + this.prviSportista;
      }
      this.prviSportista = this.sportiste[0];
      this.drugiSportista = this.sportiste[1];
      this.treceCetvrto = false;
      this.finale = true;
      return;
     }

     //finalni mec - pobednik celog takmicenja
     if(this.finale){
      if(brojSetovaPrvi < brojSetovaDrugi){
        this.pomocnikSportista =  this.sportiste[0];
        this.pomocnikRang =  this.rangoviSportista[0];
        this.sportiste[0] = this.sportiste[1];
        this.rangoviSportista[0] = this.rangoviSportista[1];
        this.sportiste[1] = this.pomocnikSportista;
        this.rangoviSportista[1] = this.pomocnikRang;
        this.message = "Pobednik Takmicenja je: " + this.drugiSportista;
      }else{
        this.message = "Pobednik Takmicenja je: " + this.prviSportista;
      }
      this.treceCetvrto = false;
      this.finale = false;
      this.krajTakmicenja = true;
      // unosenje medalja u bazu podataka, i podesavanje takmicenja na zavrseno.
      this.povecajZlatnu();
      this.povecajSrebrnu();
      this.povecajBronzanu();

      this.zavrsiTakmicenje();
      return;
     }

    //ovo se izvrsava pri svakom unosu meca koji je pre borbe za trece i cetvrto mesto.
    this.azurirajIgraceNakonMeca(brojSetovaPrvi, brojSetovaDrugi);

  }

}

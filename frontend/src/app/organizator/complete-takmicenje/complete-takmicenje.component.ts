import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Forma } from 'src/app/models/forma';
import { Prijava } from 'src/app/models/prijava';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-complete-takmicenje',
  templateUrl: './complete-takmicenje.component.html',
  styleUrls: ['./complete-takmicenje.component.css']
})
export class CompleteTakmicenjeComponent implements OnInit {

  message: string;
  message2: string;

  pokaziPrijave: boolean;

  svaTakmicenja: Takmicenje[];
  odabranoTakmicenje: Takmicenje;

  forma: Forma;
  
  prijave:Prijava[];


  minI: number;
  maxI: number;
  curI: number;

  

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("organizator")){
      this.router.navigate(["/"]);
      return;
    }
    this.minI = 0;
    this.maxI = 0;
    this.curI = 0;
    this.getAllTakmicenja();
    this.pokaziPrijave = false;
    this.prijave = [];
    this.odabranoTakmicenje = null;
  }

  getAllTakmicenja(){
    this.servis.getCreatedTakmicenja().subscribe((data) => {
      this.svaTakmicenja = data.takmicenja;
    });
  }

  getTakmicenjeByIme(ime){
    this.servis.getTakmicenjeByIme(ime).subscribe((data) => {
      this.odabranoTakmicenje = data.takmicenje;
      this.curI = this.odabranoTakmicenje.sportisti.length;
    });
  }

  onSelectTakmicenje(takmicenje){
    this.odabranoTakmicenje = takmicenje.value;
    this.getTakmicenjeByIme(this.odabranoTakmicenje.ime);
    this.getPrijaveByTakmicenje(this.odabranoTakmicenje.ime);
    this.getFormaByIme(this.odabranoTakmicenje.format);
    this.pokaziPrijave = true;
  }

  getFormaByIme(ime){
    this.servis.getFormaByIme(ime).subscribe((data) =>{
      this.forma = data.forma;
      this.minI = this.forma.minIgraca;
      this.maxI = this.forma.maxIgraca;
    });
  }

  getPrijaveByTakmicenje(takmicenje){
    this.servis.getPrijaveByTakmicenje(takmicenje).subscribe((data) => {
      this.prijave = data.prijave;
    });
  }

  onPushSportista(imeIPrezime){
    
    if(this.curI>=this.maxI){
      this.message = "Ovo takmicenje Vec ima Popunjen kapacitet ljudi!";
      this.message2 = "";
      return;
    }


    var ime = this.odabranoTakmicenje.ime;
    this.servis.pushSportistuUTakmicenje(ime, imeIPrezime).subscribe((data) =>{
      this.curI++;
      this.message = "";
      this.message2 = data.message;
      this.prijave = data.prijave;
    });
  }

  onFormiraj(form: NgForm){
    var ime = this.odabranoTakmicenje.ime;
    // var brSportista = this.odabranoTakmicenje.sportisti.length;
    // var maxI = this.forma.maxIgraca;
    // var minI = this.forma.minIgraca;

    if(!ime || this.curI > this.maxI || this.curI < this.minI){
      this.message = "Broj Igraca Mora biti izmedju minimalnog i maksimalnog broja igraca zapisanom u formatu takmicenja!";
      this.message2 =  "";
      return;
    }
    this.servis.formirajTakmicenje(ime).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Takmicenje Uspesno Prijavljeno!";
        form.controls['takmicenje'].reset()
        this.getAllTakmicenja();
        this.pokaziPrijave = false;
        this.prijave = [];
        this.odabranoTakmicenje = null;
        this.forma = null;

        this.curI = 0;
        this.minI = 0;
        this.maxI = 0;
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });
  }

  /////////////////////////////////////////////////////////
  //   var imeIPrezime = form.value.imeIPrezime;
  //   var takmicenje = this.odabranoTakmicenje.ime;
  //   var disciplina = this.odabranoTakmicenje.disciplina;
    
  //   if(!imeIPrezime || !takmicenje){
  //     this.message = "Morate popuniti sva polja forme!";
  //     this.message2 =  "";
  //     return;
  //   }
    
  //   this.servis.addPrijava(imeIPrezime, takmicenje).subscribe((data) => {
  //     if(data.message.localeCompare("Success!") == 0){
  //       this.message = "";
  //       this.message2 = "Sportista Successfully Prijavljen!";
  //       form.controls['takmicenje'].reset()
  //       form.controls['imeIPrezime'].reset()
  //       this.sviSportisti = [];
  //       this.pokaziSportiste = false;        
  //     }  
  //     else{
  //       this.message = data.message;
  //       this.message2 = "";
  //     }
  //   });

  // }
}

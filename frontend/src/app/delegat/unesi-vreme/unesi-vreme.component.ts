import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Takmicenje } from 'src/app/models/takmicenje';

@Component({
  selector: 'app-unesi-vreme',
  templateUrl: './unesi-vreme.component.html',
  styleUrls: ['./unesi-vreme.component.css']
})
export class UnesiVremeComponent implements OnInit {

  message: string;
  message2: string;
  svaTakmicenja: Takmicenje[];
  odabranoTakmicenje: Takmicenje;

  lokcaijaTakmicenja: string;

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("delegat")){
      this.router.navigate(["/"]);
      return;
    }
    this.getAllTakmicenja();
    this.lokcaijaTakmicenja = "";
    this.odabranoTakmicenje = null;
  }

  getAllTakmicenja(){
    this.servis.getTakmicenjaBezPocetkomByDelegat().subscribe((data) => {
      this.svaTakmicenja = data.takmicenja;
    });
  }

  onSelectTakmicenje(takmicenje){
    this.odabranoTakmicenje = takmicenje.value;
    this.lokcaijaTakmicenja = this.odabranoTakmicenje.lokacija;
  }

  onUnosVremena(form: NgForm){
    var datum = form.value.datum;
    
    if(!this.odabranoTakmicenje || !datum){
      this.message = "Morate popuniti sva polja forme!";
      this.message2 =  "";
      return;
    }

    var takmicenje = this.odabranoTakmicenje.ime;

      this.servis.updatePocetak(takmicenje, datum, this.lokcaijaTakmicenja).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Pocetak Takmicenja updated!";
        form.controls['takmicenje'].reset()
        this.lokcaijaTakmicenja = "";
        this.odabranoTakmicenje = null;
        this.getAllTakmicenja();   
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });
  }

}

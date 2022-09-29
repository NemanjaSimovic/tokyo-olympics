import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Sportista } from 'src/app/models/sportista';

@Component({
  selector: 'app-ucitavanje-fajla',
  templateUrl: './ucitavanje-fajla.component.html',
  styleUrls: ['./ucitavanje-fajla.component.css']
})
export class UcitavanjeFajlaComponent implements OnInit {

  selectedFile: File;
  ucitaniSportisti: Sportista[];
  nacionalnost: string;

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("vodja")){
      this.router.navigate(["/"]);
      return;
    }
    this.nacionalnost = this.servis.getCurNacionalnost();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        this.ucitaniSportisti = JSON.parse(fileReader.result)
      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  dodajSprtistu(kurzor){
    var imeIPrezime = this.ucitaniSportisti[kurzor].imeIPrezime;
    var pol = this.ucitaniSportisti[kurzor].pol;
    var sport = this.ucitaniSportisti[kurzor].sport;
    var discipline = this.ucitaniSportisti[kurzor].discipline;

    this.servis.addSportista(imeIPrezime, pol, this.nacionalnost, sport, discipline).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        console.log("Sportista uspesno dodat u Sistem!");
      }  
      else{
        console.log(data.message);
      }
    });;
  }

  onUpload(){
    for(var i=0; i<this.ucitaniSportisti.length; i++){
      this.dodajSprtistu(i);
    }
  }

}

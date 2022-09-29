import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Sport } from 'src/app/models/sport';

@Component({
  selector: 'app-add-sports',
  templateUrl: './add-sports.component.html',
  styleUrls: ['./add-sports.component.css']
})
export class AddSportsComponent implements OnInit {

  message: string;
  message2: string;

  sviSportovi: Sport[];

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("organizator")){
      this.router.navigate(["/"]);
      return;
    }
    this.getAllSports();
  }

  getAllSports(){
    this.servis.getAllSportovi().subscribe((data) => {
      this.sviSportovi = data.sportovi;
    });  
  }

  onAddSport(form: NgForm){
    var ime = form.value.ime;
    console.log(ime);
    
    this.servis.addSport(ime).subscribe((data) => {

      if(!ime){
        this.message = "Morate popuniti sva polja forme!";
        this.message2 =  "";
        return;
      }
  
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.getAllSports();
        this.message2 = "Disciplina Successfully Added!";
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });
  }

  onAddDisciplina(form: NgForm){
    var sport = form.value.sport;
    var naziv = form.value.naziv;
    var individualni = form.value.individualni;
    
    if(!sport || !naziv || !individualni){
      this.message = "Morate popuniti sva polja forme!";
      this.message2 =  "";
      return;
    }

    this.servis.addDisciplina(sport, naziv, individualni).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Disciplina Successfully Added!";
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });
  }

}

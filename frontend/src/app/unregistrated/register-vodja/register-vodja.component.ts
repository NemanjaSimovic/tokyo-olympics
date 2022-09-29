import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Zemlja } from 'src/app/models/zemlja';

@Component({
  selector: 'app-register-vodja',
  templateUrl: './register-vodja.component.html',
  styleUrls: ['./register-vodja.component.css']
})
export class RegisterVodjaComponent implements OnInit {


  constructor(private servis: KorisnikService, private router: Router) { }

  message:string;
  message2: string;
  zemljeBezVodje: Zemlja[]; 

  ngOnInit(): void {
    this.message = "";
    this.message2 = "";
    this.onGetCountriesWithoutLeader();
  }


  onGetCountriesWithoutLeader(): void{
    this.servis.getCountriesWithoutLeader().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.zemljeBezVodje = data.zemlje;
      }  
    });
  }

  triIstaUNizu(sifr: string): boolean{
    var duzina = sifr.length;
    var c: string = sifr[0];
    var brojac: number = 1;
    for(var i = 1; i<duzina; i++){
      if(!sifr[i].localeCompare(c)){
        brojac++;
        if(brojac>=3){
          return true;
        }
      }else{
        c = sifr[i];
        brojac = 1;
      }
    }
    return false;
  }

  onRegister(form: NgForm){

    var username = form.value.username;
    var password = form.value.password;
    var ime =  form.value.ime;
    var prezime =  form.value.prezime;
    var email =  form.value.email;
    var nacionalnost =  form.value.nacionalnost;

    if(!username || !password || !ime || !prezime || !email || !nacionalnost){
      this.message = "Morate popuniti sva polja forme!";
      return;
    }

    if(password.length < 8 || password.length > 12){
      this.message = "Sifra mora biti duzine 8-12!";
      return;
    }else{
      if(this.triIstaUNizu(password)){
        this.message = "Sifra ne sme sadrzati 3+ ista karaktera u nizu!";
        return;
      }
    }

    const data={
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      email: email,
      nacionalnost: nacionalnost,
      tip: "vodja"
    }

    var pass = form.value.password;
    var regexPatern1 = /^[a-z](?=.*[0-9]{2,})(?=.*[!@#$%^&*]{2,})(?=.*[a-z]{2,})(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,11}$/;
    var regexPatern2 = /^[A-Z](?=.*[0-9]{2,})(?=.*[!@#$%^&*]{2,})(?=.*[a-z]{3,})[a-zA-Z0-9!@#$%^&*]{7,11}$/;
    if(!(pass.match(regexPatern1) || pass.match(regexPatern2))) {
      this.message = "Password mora sadrzati najmanje 3 mala slova, 1 veliko slovo, 2 broja i 2 specijalna karaktera. Sifra mora biti duzine 8-12! ";
      this.message2 = "";
      return;
    }
       
    this.servis.register(data).subscribe(data => {
      
      if(data.message.localeCompare("Success!") == 0){
        this.onGetCountriesWithoutLeader();
        this.message = "";
        this.message2 = "User Successfully added!";
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
      //  form.resetForm();
    });
  }

}

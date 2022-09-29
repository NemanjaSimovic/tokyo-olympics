import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-change-passowrd',
  templateUrl: './change-passowrd.component.html',
  styleUrls: ['./change-passowrd.component.css']
})
export class ChangePassowrdComponent implements OnInit {


  constructor(private servis: KorisnikService, private router: Router) { }

  message:string;

  pass: string;

  ngOnInit(): void {
    this.message = "";
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

  onChangePassword(form: NgForm){

    var username = form.value.username;
    var password = form.value.password;
    var newPassword =  form.value.newPassword;
    var confirmPassword =  form.value.confirmPassword;

    if(!username || !password || !newPassword || !confirmPassword){
      this.message = "Morate popuniti sva polja forme!";
      return;
    }

    if(newPassword.length < 8 || newPassword.length > 12){
      this.message = "Nova Sifra mora biti duzine 8-12!";
      return;
    }else{
      if(this.triIstaUNizu(newPassword)){
        this.message = "Sifra ne sme sadrzati 3+ ista karaktera u nizu!";
        return;
      }
    }

    if(!password.localeCompare(newPassword)){
      this.message = "Stara i Nova Sifra moraju biti razlicite!";
      return;
    }

    if(newPassword.localeCompare(confirmPassword)){
      this.message = "Nova Sifra I potvrda nove sifre se ne poklapaju!";
      return;
    }

    

    const data={
      username: username,
      password: password,
      newPassword: newPassword
    }


    var pass = form.value.newPassword;
    var regexPatern1 = /^[a-z](?=.*[0-9]{2,})(?=.*[!@#$%^&*]{2,})(?=.*[a-z]{2,})(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,11}$/;
    var regexPatern2 = /^[A-Z](?=.*[0-9]{2,})(?=.*[!@#$%^&*]{2,})(?=.*[a-z]{3,})[a-zA-Z0-9!@#$%^&*]{7,11}$/;
    if(!(pass.match(regexPatern1) || pass.match(regexPatern2))) {
      this.message = "Nova Sifra mora sadrzati najmanje 3 mala slovo, 1 veliko slovo, 2 broja i 2 specijalna karaktera. Nova Sifra mora biti duzine 8-12! ";
      return;
    }
       
    this.servis.changePassword(username, password, newPassword).subscribe(data => {
      
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.servis.clearCurKorisnik();
        this.servis.clearUserType();
        this.servis.clearCurNacionalnost();
        alert("Lozinka Uspesno promenjena!");
        this.router.navigate(["/login"]);
      }  
      else{
        this.message = data.message;
      }
      //  form.resetForm();
    });
  }
}

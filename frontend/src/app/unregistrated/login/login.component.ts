import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  message: string;

  ngOnInit(): void {
    this.message = "";
  }

  callMethod() {
    this.servis.azurirajZaglavlje();
  }

  onLogin(form: NgForm){
    var username = form.value.username;
    var password = form.value.password;

    if(!username || !password){
      this.message = "Morate popuniti sva polja forme!";
      return;
    }

    this.servis.login(username, password).subscribe(data => {
      
      if(data.message.localeCompare("Success!") == 0){
        this.servis.setCurKorisnik(data.korisnik);
        this.message = "";
        this.servis.setUserType(data.tip);
        this.servis.setCurNacionalnost(data.korisnik.nacionalnost);
        this.callMethod();
        if(this.servis.getCurKorisnik().aktivan == 0){
          this.router.navigate(["/notactive"]);
        }else{
          if(this.servis.getUserType()=="organizator"){
            this.router.navigate(["/organizator/home"]);
          }else 
            if(this.servis.getUserType()=="vodja"){
              this.router.navigate(["/vodja/home"]);
          }else 
            if(this.servis.getUserType()=="delegat"){
              this.router.navigate(["/delegat/home"]);
            }
        }
      }  else{
        this.message = data.message;
      }
    });
  };

}

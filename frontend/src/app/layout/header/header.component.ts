import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userType: string = "";

  organizator: boolean = false;
  delegat: boolean = false;
  vodja: boolean = false;

  constructor(private servis: KorisnikService, private router: Router) {
    this.servis.korisnikPromenjen$.subscribe(() => {
      // alert('Dobrodosli!');
      this.userType = this.servis.getUserType();

      if(!this.userType.localeCompare("vodja")){
        this.vodja = true;
        this.organizator = false;
        this.delegat = false;
      }else if(!this.userType.localeCompare("delegat")){
        this.delegat = true;
        this.vodja = false;
        this.organizator = false;
      }else if(!this.userType.localeCompare("organizator")){
        this.organizator = true;
        this.vodja = false;
        this.delegat = false;
      }else{
        this.userType = "";
        this.organizator = false;
        this.vodja = false;
        this.delegat = false;

        this.servis.clearCurKorisnik();
        this.servis.clearCurNacionalnost();
        this.servis.clearUserType();
      }
    });
  }

  ngOnInit(): void {
    this.userType = this.servis.getUserType();

      if(!this.userType.localeCompare("vodja")){
        this.vodja = true;
        this.organizator = false;
        this.delegat = false;
      }else if(!this.userType.localeCompare("delegat")){
        this.delegat = true;
        this.vodja = false;
        this.organizator = false;
      }else if(!this.userType.localeCompare("organizator")){
        this.organizator = true;
        this.vodja = false;
        this.delegat = false;
      }else{
        this.userType = "";
        this.organizator = false;
        this.vodja = false;
        this.delegat = false;

        this.servis.clearCurKorisnik();
        this.servis.clearCurNacionalnost();
        this.servis.clearUserType();
      }

  }

  logout(){
    this.servis.clearUserType();
    this.servis.clearCurKorisnik();
    this.servis.clearCurNacionalnost();

    this.userType = this.servis.getUserType();

      if(!this.userType.localeCompare("vodja")){
        this.vodja = true;
        this.organizator = false;
        this.delegat = false;
      }else if(!this.userType.localeCompare("delegat")){
        this.delegat = true;
        this.vodja = false;
        this.organizator = false;
      }else if(!this.userType.localeCompare("organizator")){
        this.organizator = true;
        this.vodja = false;
        this.delegat = false;
      }else{
        this.userType = "";
        this.organizator = false;
        this.vodja = false;
        this.delegat = false;

        this.servis.clearCurKorisnik();
        this.servis.clearCurNacionalnost();
        this.servis.clearUserType();
      }

    this.router.navigate(["/login"]); 
  }

  

}

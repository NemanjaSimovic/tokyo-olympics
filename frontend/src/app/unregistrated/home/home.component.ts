import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(!this.servis.getUserType().localeCompare("delegat")){
      this.router.navigate(["/delegat/home"]);
    }

    if(!this.servis.getUserType().localeCompare("vodja")){
      this.router.navigate(["/vodja/home"]);
    }

    if(!this.servis.getUserType().localeCompare("organizator")){
      this.router.navigate(["/organizator/home"]);
    }
  }

}

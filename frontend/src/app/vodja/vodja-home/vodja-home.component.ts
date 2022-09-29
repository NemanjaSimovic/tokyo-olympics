import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-vodja-home',
  templateUrl: './vodja-home.component.html',
  styleUrls: ['./vodja-home.component.css']
})
export class VodjaHomeComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("vodja")){
      this.router.navigate(["/"]);
      return;
    }
  }

}

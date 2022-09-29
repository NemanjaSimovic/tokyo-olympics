import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Korisnik } from 'src/app/models/korisnik';

@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.css']
})
export class ApproveUsersComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  korisnici: Korisnik[];
  message: string;

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("organizator")){
      this.router.navigate(["/"]);
      return;
    }
    this.dohvatiNePrihvacene();
    this.message = "";
  }

  dohvatiNePrihvacene(){
    this.servis.getUnapprovedUsers().subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.korisnici = data.korisnici;
      } 
    });
  }

  onApproveUser(username){
    this.servis.approveUser(username).subscribe((data) =>{
      this.message = data.message;
      this.dohvatiNePrihvacene();
    });
  }

}

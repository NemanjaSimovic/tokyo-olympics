import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Zemlja } from 'src/app/models/zemlja';

@Component({
  selector: 'app-medalje',
  templateUrl: './medalje.component.html',
  styleUrls: ['./medalje.component.css']
})
export class MedaljeComponent implements OnInit {

  sveZemlje: Zemlja[];

  displayedColumns: string[] = ['naziv', 'brZlatnih', 'brSrebrnih', 'brBronzanih', 'brUkupno'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.onGetAllCountries();
  }

  sortirajPobrojuMedalja( a, b ) {
    if ( a.brUkupno < b.brUkupno ){
      return 1;
    }
    if ( a.brUkupno > b.brUkupno ){
      return -1;
    }
    return 0;
  }


  onGetAllCountries(): void{
    this.servis.getAllCountries().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.sveZemlje = data.zemlje;
        this.sveZemlje.sort(this.sortirajPobrojuMedalja);
        //vazno! pozivati ove 2 metode nakon svakog search, kako bi se napravila paginacija i za pretrazene rezultate
        this.dataSource = new MatTableDataSource<Zemlja>(this.sveZemlje);
        this.dataSource.paginator = this.paginator;
      }  
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Zemlja } from 'src/app/models/zemlja';

@Component({
  selector: 'app-zemlje',
  templateUrl: './zemlje.component.html',
  styleUrls: ['./zemlje.component.css']
})
export class ZemljeComponent implements OnInit {

  sveZemlje: Zemlja[];

  displayedColumns: string[] = ['zastava', 'naziv', 'brSportista'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.onGetAllCountries();
  }

  onGetAllCountries(): void{
    this.servis.getAllCountries().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.sveZemlje = data.zemlje;
        //vazno! pozivati ove 2 metode nakon svakog search, kako bi se napravila paginacija i za pretrazene rezultate
        this.dataSource = new MatTableDataSource<Zemlja>(this.sveZemlje);
        this.dataSource.paginator = this.paginator;
      }  
    });
  }

}

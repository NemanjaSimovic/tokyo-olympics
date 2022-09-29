import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Disciplina } from 'src/app/models/disciplina';
import { Sport } from 'src/app/models/sport';
import { Sportista } from 'src/app/models/sportista';
import { Zemlja } from 'src/app/models/zemlja';

@Component({
  selector: 'app-sportisti',
  templateUrl: './sportisti.component.html',
  styleUrls: ['./sportisti.component.css']
})
export class SportistiComponent implements OnInit {


  sviSportisti: Sportista[] = [];
  sveZemlje: Zemlja[];
  sviSportovi: Sport[];
  sveDiscipline: Disciplina[];

  imeIPrezime: string;
  odabranaZemlja: string;
  odabraniSport: string;
  odabranaDisciplina: string;
  odabraniPol: string;
  samoOsvajaci: number;

  displayedColumns: string[] = ['pol', 'imeIPrezime', 'nacionalnost', 'sport'/*, 'discipline'*/, 'brUkupno'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private servis: KorisnikService, private router: Router) { }


  ngOnInit(): void {
    // this.onGetAllSportisti();
    // this.onGetSearchedSportisti();

    this.onGetAllCountries();  
    this.onGetAllSports();
    this.onGetAllDisciplines();

    this.imeIPrezime = "";
    this.odabranaZemlja = "";
    this.odabraniSport = "";
    this.odabranaDisciplina = "";
    this.odabraniPol = "";
    this.samoOsvajaci = 0;
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


  onGetAllSportisti(): void{
    this.servis.getAllSportisti().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.sviSportisti = data.sportisti;
        this.sviSportisti.sort(this.sortirajPobrojuMedalja);
        //vazno! pozivati ove 2 metode nakon svakog search, kako bi se napravila paginacija i za pretrazene rezultate
        this.dataSource = new MatTableDataSource<Sportista>(this.sviSportisti);
        this.dataSource.paginator = this.paginator;
      }  
    });
  }

  onGetSearchedSportisti(form: NgForm): void{
    
    this.imeIPrezime = form.value.imeIPrezime;
    this.odabranaZemlja = form.value.odabranaZemlja;
    this.odabraniSport = form.value.odabraniSport;
    this.odabranaDisciplina = form.value.odabranaDisciplina;
    this.odabraniPol = form.value.odabraniPol;
    this.samoOsvajaci = form.value.samoOsvajaci;

    this.servis.getSearchedSportisti( this.imeIPrezime, this.odabranaZemlja,
                                      this.odabraniSport, this.odabranaDisciplina, 
                                      this.odabraniPol, this.samoOsvajaci)
                                      .subscribe( data => {
      if(data.message.localeCompare("Success!") == 0){
        this.sviSportisti = data.sportisti;
        this.sviSportisti.sort(this.sortirajPobrojuMedalja);
        //vazno! pozivati ove 2 metode nakon svakog search, kako bi se napravila paginacija i za pretrazene rezultate
        this.dataSource = new MatTableDataSource<Sportista>(this.sviSportisti);
        this.dataSource.paginator = this.paginator;
      }  
    });
  }

  onGetAllCountries(): void{
    this.servis.getAllCountries().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.sveZemlje = data.zemlje;
      }  
    });
  }

  onGetAllSports(): void{
    this.servis.getAllSportovi().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.sviSportovi = data.sportovi;
      }  
    });
  }

  onGetAllDisciplines(): void{
    this.servis.getAllDiscipline().subscribe(data =>{
      if(data.message.localeCompare("Success!") == 0){
        this.sveDiscipline = data.discipline;
      }  
    });
  }

}

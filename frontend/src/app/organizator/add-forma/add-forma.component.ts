import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Sport } from 'src/app/models/sport';
import { TipForme } from 'src/app/models/tipforme';

@Component({
  selector: 'app-add-forma',
  templateUrl: './add-forma.component.html',
  styleUrls: ['./add-forma.component.css']
})
export class AddFormaComponent implements OnInit {

  message: string;
  message2: string;

  sviTipoviForme: TipForme[];
  tipForme: string;

  stotinke: boolean;
  minuti: boolean;
  casovi: boolean;

  trka: boolean;



  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    if(this.servis.getUserType().localeCompare("organizator")){
      this.router.navigate(["/"]);
      return;
    }
    this.getAllTipoviForme();
    this.tipForme = "";
    this.trka = false;
    this.stotinke = false;
    this.minuti = false;
    this.casovi = false;
  }

  getAllTipoviForme(){
    this.servis.getAllTipoviForme().subscribe((data) => {
      this.sviTipoviForme = data.tipoviforme;
    });  
  }

  onTipChange(tip){
    this.tipForme = tip.value;
    if(this.tipForme.localeCompare("trka")){
      this.stotinke = false;
      this.minuti = false;
      this.casovi = false;
      this.trka = false;
    }else{
      this.trka = true;
    }
  }

  onAddForm(form: NgForm){
    
    var ime = form.value.ime;
    var tip = form.value.tip;
    var minIgraca = form.value.minIgraca;
    var maxIgraca = form.value.maxIgraca;
    var brRundi = form.value.brRundi;

    if(!ime || !tip || !minIgraca || !maxIgraca || !brRundi || minIgraca > maxIgraca){
      this.message = "Morate popuniti sva polja forme!";
      this.message2 =  "";
      return;
    }

    if(this.trka){
      this.stotinke = form.value.stotinke;
      this.minuti = form.value.minuti;
      this.casovi = form.value.casovi;
    }else{
      this.stotinke = false;
      this.minuti = false;
      this.casovi = false;
    }
    
    this.servis.addForma(ime, tip, minIgraca, maxIgraca, brRundi, this.stotinke, this.minuti, this.casovi).subscribe((data) => {
      if(data.message.localeCompare("Success!") == 0){
        this.message = "";
        this.message2 = "Forma Successfully Added!";
      }  
      else{
        this.message = data.message;
        this.message2 = "";
      }
    });
    
  }
}

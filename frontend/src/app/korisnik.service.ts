import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from './models/disciplina';
import { Forma } from './models/forma';

import { Korisnik } from './models/korisnik';
import { Lokacija } from './models/lokacija';
import { Prijava } from './models/prijava';
import { Sport } from './models/sport';
import { Sportista } from './models/sportista';
import { Takmicenje } from './models/takmicenje';
import { TipForme } from './models/tipforme';
import { Zemlja } from './models/zemlja';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  
  constructor( private http: HttpClient, private router: Router) { }

  uri = 'http://localhost:4000';

  //proba komunikacija s headerom
 // Observable string sources
 private azuriranjeZaglavlja = new Subject<any>();
  
 // Observable string streams
 korisnikPromenjen$ = this.azuriranjeZaglavlja.asObservable();

 // Service message commands
 azurirajZaglavlje() {
   this.azuriranjeZaglavlja.next();
 }

  //data of takmicenje that is currently in play
  getCurTakmicenje(){
    return JSON.parse(localStorage.getItem("CurTakmicenje"));
  }
  setCurTakmicenje(takmicenje: Takmicenje): void{
    localStorage.setItem('CurTakmicenje', JSON.stringify(takmicenje));
  }
  clearCurTakmicenje(): void{
    localStorage.setItem('CurTakmicenje', "");
  };

  //rangovi takmicara koji trenutno igraju, istim redosledom zabelezeni kao i sami sportisti takmicenja.
  getCurRangovi(){
    return JSON.parse(localStorage.getItem("CurRangovi"));
  }
  setCurRangovi(rangovi: number[]): void{
    localStorage.setItem('CurRangovi', JSON.stringify(rangovi));
  }
  clearCurRangovi(): void{
    localStorage.setItem('CurRangovi', "");
  };

  //data of forma of takmicenje that is currently in play
  getCurForma(){
    return JSON.parse(localStorage.getItem("CurForma"));
  }
  setCurForma(forma: Forma): void{
    localStorage.setItem('CurForma', JSON.stringify(forma));
  }
  clearCurForma(): void{
    localStorage.setItem('CurForma', "");
  };

  //data of forma of takmicenje that is currently in play
  getCurSportisti(){
    return JSON.parse(localStorage.getItem("CurSportisti"));
  }
  setCurSportisti(sportisti: string[]): void{
    localStorage.setItem('CurSportisti', JSON.stringify(sportisti));
  }
  clearCurSportisti(): void{
    localStorage.setItem('CurSportisti', "");
  };

  //data of currently logged in user
  getCurKorisnik(){
    return JSON.parse(localStorage.getItem("curKorisnik"));
  }
  setCurKorisnik(korisnik: Korisnik): void{
    localStorage.setItem('curKorisnik', JSON.stringify(korisnik));
  }
  clearCurKorisnik(): void{
    localStorage.setItem('curKorisnik', "");
  };

  //type of currently logged in user
  getUserType(){
    if(localStorage.getItem("userType") === null){
      this.setUserType("");
      this.setCurKorisnik(null);
      this.setCurNacionalnost(null);
      return "";
    }else{
      return localStorage.getItem("userType");
    }
  }
  setUserType(newType: string): void{
    localStorage.setItem("userType", newType);
  }
  clearUserType(): void{
    localStorage.setItem("userType", "");
  }

  //Nationality of currently logged in user
  getCurNacionalnost(){
    return JSON.parse(localStorage.getItem("curNacionalnost"));
  }
  setCurNacionalnost(nac: string): void{
    localStorage.setItem("curNacionalnost", JSON.stringify(nac));
  }
  clearCurNacionalnost(): void{
    localStorage.setItem("curNacionalnost", "");
  };

  login(username, password){
    const data={
      username: username,
      password: password
    }
       
     return this.http.post<{message: string, korisnik: Korisnik, tip: string}>(`${this.uri}/api/users/login`, data);
  
  }

  register(data){
    return this.http.post<{message: string}>(`${this.uri}/api/users/register`, data);
  }

  approveUser(username){
    const data={
      username: username
    }

    return this.http.post<{message: string}>(`${this.uri}/api/users/korisnik/approve`, data)
  }

  
  getUnapprovedUsers(){
    return this.http.get<{message: string, korisnici: Korisnik[]}>(`${this.uri}/api/users/korisnici/find/unapproved`);
  }

  getAllCountries(){
    return this.http.get<{message: string, zemlje: Zemlja[]}>(`${this.uri}/api/users/zemlje/find/all`);
  }

  getCountriesWithoutLeader(){
    return this.http.get<{message: string, zemlje: Zemlja[]}>(`${this.uri}/api/users/zemlje/find/withoutleader`);
  }
  
  getAllSportisti(){
    return this.http.get<{message: string, sportisti: Sportista[]}>(`${this.uri}/api/users/sportisti/find/all`);
  }

  getSportistiByDisciplina(disciplina, pol){
    var nacionalnost = this.getCurNacionalnost();
    const data={
      disciplina: disciplina,
      pol: pol,
      nacionalnost: nacionalnost
    }
    return this.http.post<{message: string, sportisti: Sportista[]}>(`${this.uri}/api/users/sportisti/find/bydisciplina`, data);
  }

  getSportistinRang(imeIPrezime){
    const data={
      imeIPrezime: imeIPrezime
    }
    return this.http.post<{message: string, rang: number}>(`${this.uri}/api/users/sportisti/dohvati/rang`, data);
  }

  getPrijaveByTakmicenje(takmicenje){
    const data={
      takmicenje: takmicenje
    }
    return this.http.post<{message: string, prijave: Prijava[]}>(`${this.uri}/api/users/prijave/find/bytakmicenje`, data);
  }

  getFormaByIme(ime){
    const data={
      ime: ime
    }
    return this.http.post<{message: string, forma: Forma}>(`${this.uri}/api/users/forme/find/byname`, data);
  }

  getSearchedSportisti(imeIPrezime, nacionalnost, sport, disciplina, pol, samoOSvajaci){
    const data={
      imeIPrezime: imeIPrezime,
      nacionalnost: nacionalnost,
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      samoOSvajaci: samoOSvajaci
    }
    return this.http.post<{message: string, sportisti: Sportista[]}>(`${this.uri}/api/users/sportisti/search`, data);
  }

  getAllSportovi(){
    return this.http.get<{message: string, sportovi: Sport[]}>(`${this.uri}/api/users/sportovi/find/all`);
  }

  getAllDiscipline(){
    return this.http.get<{message: string, discipline: Disciplina[]}>(`${this.uri}/api/users/discipline/find/all`);
  }

  getAllTakmicenja(){
    return this.http.get<{message: string, takmicenja: Takmicenje[]}>(`${this.uri}/api/users/takmicenja/find/all`);
  }
  
  getCreatedTakmicenja(){
    return this.http.get<{message: string, takmicenja: Takmicenje[]}>(`${this.uri}/api/users/takmicenja/find/napravljena`);
  }

  getFormedTakmicenja(){
    return this.http.get<{message: string, takmicenja: Takmicenje[]}>(`${this.uri}/api/users/takmicenja/find/formirana`);
  }

  getFinishedTakmicenja(){
    return this.http.get<{message: string, takmicenja: Takmicenje[]}>(`${this.uri}/api/users/takmicenja/find/zavrsena`);
  }

  getDisciplineBySport(sport){
    const data={
      sport: sport
    }
    return this.http.post<{message: string, discipline: Disciplina[]}>(`${this.uri}/api/users/discipline/find/bysport`, data);
  }

  getSlobodneWDiscipline(){
    return this.http.get<{message: string, discipline: Disciplina[]}>(`${this.uri}/api/users/discipline/find/takwfalse`);
  }

  getSlobodneMDiscipline(){
    return this.http.get<{message: string, discipline: Disciplina[]}>(`${this.uri}/api/users/discipline/find/takmfalse`);
  }

  addSport(ime){
    const data={
      ime: ime
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/sportovi/create`, data);
  }

  addDisciplina(sport, naziv, individualni){
    const data={
      sport: sport,
      naziv: naziv,
      individualni: individualni
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/discipline/create`, data);
  }

  getAllTipoviForme(){
    return this.http.get<{message: string, tipoviforme: TipForme[]}>(`${this.uri}/api/users/tipoviforme/find/all`);
  }

  getAllForme(){
    return this.http.get<{message: string, forme: Forma[]}>(`${this.uri}/api/users/forme/find/all`);
  }

  getAvailableDelegats(){
    return this.http.get<{message: string, delegati: Korisnik[]}>(`${this.uri}/api/users/korisnici/find/available/delegat`);
  }

  addSportista(imeIPrezime, pol, nacionalnost, sport, discipline){
    const data={
      imeIPrezime: imeIPrezime,
      pol: pol,
      nacionalnost: nacionalnost,
      sport: sport,
      discipline: discipline
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/sportisti/create`, data);
  }

  addForma(ime, tip, minIgraca, maxIgraca, brRundi, stotinke, minuti, casovi){
    const data={
      ime: ime,
      tip: tip,
      minIgraca: minIgraca,
      maxIgraca: maxIgraca,
      brRundi: brRundi,
      stotinke: stotinke,
      minuti: minuti,
      casovi: casovi
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/forme/create`, data);
  }

  addTakmicenje(ime, format, pol, sport, disciplina, delegat, lokacija){
    const data={
      ime: ime,
      format: format,
      pol: pol,
      sport: sport,
      disciplina: disciplina,
      delegat: delegat,
      lokacija: lokacija
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/takmicenja/create`, data);
  }

  addPrijava(imeIPrezime, takmicenje){
    var nacionalnost = this.getCurNacionalnost();

    const data={
      imeIPrezime: imeIPrezime,
      nacionalnost: nacionalnost,
      takmicenje: takmicenje
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/prijave/create`, data);
  }

  getAllLokacije(){
    return this.http.get<{message: string, lokacije: Lokacija[]}>(`${this.uri}/api/users/lokacije/find/all`);
  }

  formirajTakmicenje(ime){

    const data={
      ime: ime
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/takmicenja/formiraj`, data);
  }

  pushSportistuUTakmicenje(ime, imeIPrezime){

    const data={
      ime: ime,
      imeIPrezime: imeIPrezime
    }
    return this.http.post<{message: string, prijave: Prijava[]}>(`${this.uri}/api/users/takmicenja/push/sportista`, data);
  }

  povecajZlatnuSportisti(imeIPrezime){

    const data={
      imeIPrezime: imeIPrezime
    }
    return this.http.post<{message: string, zemlja: string}>(`${this.uri}/api/users/sportisti/update/zlatna`, data);
  }

  povecajSrebrnuSportisti(imeIPrezime){

    const data={
      imeIPrezime: imeIPrezime
    }
    return this.http.post<{message: string, zemlja: string}>(`${this.uri}/api/users/sportisti/update/srebrna`, data);
  }

  povecajBronzanuSportisti(imeIPrezime){

    const data={
      imeIPrezime: imeIPrezime
    }
    return this.http.post<{message: string, zemlja: string}>(`${this.uri}/api/users/sportisti/update/bronzana`, data);
  }

  povecajZlatnuZemlji(zemlja){

    const data={
      zemlja: zemlja
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/zemlje/update/zlatna`, data);
  }

  povecajSrebrnuZemlji(zemlja){

    const data={
      zemlja: zemlja
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/zemlje/update/srebrna`, data);
  }

  povecajBronzanuZemlji(zemlja){

    const data={
      zemlja: zemlja
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/zemlje/update/bronzana`, data);
  }

  
  getTakmicenjeByIme(ime){
    const data={
      ime: ime
    }
    return this.http.post<{message: string, takmicenje: Takmicenje}>(`${this.uri}/api/users/takmicenja/find/byime`, data);
  }

  getTakmicenjaBezPocetkomByDelegat(){
    var del: Korisnik = this.getCurKorisnik();
    const data={
      delegat: del.username
    }
    return this.http.post<{message: string, takmicenja: Takmicenje[]}>(`${this.uri}/api/users/takmicenja/find/bezpocetka/bydelegat`, data);
  }

  getTakmicenjaSaPocetkomByDelegat(){
    var del: Korisnik = this.getCurKorisnik();
    const data={
      delegat: del.username
    }
    return this.http.post<{message: string, takmicenja: Takmicenje[]}>(`${this.uri}/api/users/takmicenja/find/sapocetkom/bydelegat`, data);
  }

  updatePocetak(ime, pocetak, lokacija){
    const data={
      ime: ime,
      pocetak: pocetak,
      lokacija: lokacija
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/takmicenja/update/pocetak`, data);
  }

  zavrsiTakmicenje(ime, prvi, drugi, treci){
    const data={
      ime: ime,
      prvi: prvi,
      drugi: drugi,
      treci: treci
    }
    return this.http.post<{message: string}>(`${this.uri}/api/users/takmicenja/zavrsi`, data);
  }

  changePassword(username, password, newPassword){
    const data={
      username: username,
      password: password,
      newPassword: newPassword
    }
       
     return this.http.post<{message: string}>(`${this.uri}/api/users/change/password`, data);
  }
  

}

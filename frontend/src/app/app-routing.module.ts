import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatHomeComponent } from './delegat/delegat-home/delegat-home.component';
import { OdaveriTakmicenjeComponent } from './delegat/odaveri-takmicenje/odaveri-takmicenje.component';
import { UnesiRezultateDaljinaComponent } from './delegat/unesi-rezultate-daljina/unesi-rezultate-daljina.component';
import { UnesiRezultateStreljastvoComponent } from './delegat/unesi-rezultate-streljastvo/unesi-rezultate-streljastvo.component';
import { UnesiRezultateTenisComponent } from './delegat/unesi-rezultate-tenis/unesi-rezultate-tenis.component';
import { UnesiRezultateComponent } from './delegat/unesi-rezultate/unesi-rezultate.component';
import { UnesiVremeComponent } from './delegat/unesi-vreme/unesi-vreme.component';
import { AddFormaComponent } from './organizator/add-forma/add-forma.component';
import { AddSportsComponent } from './organizator/add-sports/add-sports.component';
import { AddTakmicenjeComponent } from './organizator/add-takmicenje/add-takmicenje.component';
import { ApproveUsersComponent } from './organizator/approve-users/approve-users.component';
import { CompleteTakmicenjeComponent } from './organizator/complete-takmicenje/complete-takmicenje.component';
import { OrganizatorHomeComponent } from './organizator/organizator-home/organizator-home.component';
import { ChangePassowrdComponent } from './unregistrated/change-passowrd/change-passowrd.component';
import { HomeComponent } from './unregistrated/home/home.component';
import { LoginComponent } from './unregistrated/login/login.component';
import { MedaljeComponent } from './unregistrated/medalje/medalje.component';
import { NotactiveComponent } from './unregistrated/notactive/notactive.component';
import { RegisterDelegatComponent } from './unregistrated/register-delegat/register-delegat.component';
import { RegisterVodjaComponent } from './unregistrated/register-vodja/register-vodja.component';
import { RegisterComponent } from './unregistrated/register/register.component';
import { SportistiComponent } from './unregistrated/sportisti/sportisti.component';
import { ZemljeComponent } from './unregistrated/zemlje/zemlje.component';
import { AddSportistaComponent } from './vodja/add-sportista/add-sportista.component';
import { PrijavaSportistaComponent } from './vodja/prijava-sportista/prijava-sportista.component';
import { UcitavanjeFajlaComponent } from './vodja/ucitavanje-fajla/ucitavanje-fajla.component';
import { VodjaHomeComponent } from './vodja/vodja-home/vodja-home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "zemlje", component: ZemljeComponent},
  {path: "sportisti", component: SportistiComponent},
  {path: "medalje", component: MedaljeComponent},
  {path: "notactive", component: NotactiveComponent},

  {path: "login", component: LoginComponent},
  {path: "change/password", component: ChangePassowrdComponent},
  {path: "register", component: RegisterComponent},
  {path: "register/vodja", component: RegisterVodjaComponent},
  {path: "register/delegat", component: RegisterDelegatComponent},

  {path: "organizator/home", component: OrganizatorHomeComponent},
  {path: "organizator/approve/users", component: ApproveUsersComponent},

  {path: "organizator/add/sports", component: AddSportsComponent},
  {path: "organizator/add/forma", component: AddFormaComponent},
  {path: "organizator/add/takmicenje", component: AddTakmicenjeComponent},
  {path: "organizator/complete/takmicenje", component: CompleteTakmicenjeComponent},
  
  {path: "vodja/home", component: VodjaHomeComponent},
  {path: "vodja/add/sportista", component: AddSportistaComponent},
  {path: "vodja/prijava/sportista", component: PrijavaSportistaComponent},
  {path: "vodja/ucitavanje/fajla", component: UcitavanjeFajlaComponent},

  {path: "delegat/home", component: DelegatHomeComponent},
  {path: "delegat/unesi/vreme", component: UnesiVremeComponent},
  {path: "delegat/odaberi/takmicenje", component: OdaveriTakmicenjeComponent},

  {path: "delegat/unesi/rezultate/trka", component: UnesiRezultateComponent},
  {path: "delegat/unesi/rezultate/daljina", component: UnesiRezultateDaljinaComponent},
  {path: "delegat/unesi/rezultate/streljastvo", component: UnesiRezultateStreljastvoComponent},
  {path: "delegat/unesi/rezultate/tenis", component: UnesiRezultateTenisComponent},

  //danas dodato, Radi! Za slucaj da nesto baguje skini ovu liniju!
  //cilj ove linije je da preuzmeri sve putanje sajta koje ne postoje na pocetnu(Home) stranicu.
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

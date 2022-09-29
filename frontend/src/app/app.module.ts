import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//angular material moduli
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { HomeComponent } from './unregistrated/home/home.component';
import { ZemljeComponent } from './unregistrated/zemlje/zemlje.component';
import { SportistiComponent } from './unregistrated/sportisti/sportisti.component';
import { MedaljeComponent } from './unregistrated/medalje/medalje.component';
import { NotactiveComponent } from './unregistrated/notactive/notactive.component';
import { LoginComponent } from './unregistrated/login/login.component';
import { RegisterComponent } from './unregistrated/register/register.component';
import { DelegatHomeComponent } from './delegat/delegat-home/delegat-home.component';
import { OrganizatorHomeComponent } from './organizator/organizator-home/organizator-home.component';
import { VodjaHomeComponent } from './vodja/vodja-home/vodja-home.component';
import { RegisterVodjaComponent } from './unregistrated/register-vodja/register-vodja.component';
import { RegisterDelegatComponent } from './unregistrated/register-delegat/register-delegat.component';
import { ApproveUsersComponent } from './organizator/approve-users/approve-users.component';
import { AddSportsComponent } from './organizator/add-sports/add-sports.component';
import { AddFormaComponent } from './organizator/add-forma/add-forma.component';
import { AddTakmicenjeComponent } from './organizator/add-takmicenje/add-takmicenje.component';
import { CompleteTakmicenjeComponent } from './organizator/complete-takmicenje/complete-takmicenje.component';
import { AddSportistaComponent } from './vodja/add-sportista/add-sportista.component';
import { PrijavaSportistaComponent } from './vodja/prijava-sportista/prijava-sportista.component';
import { UcitavanjeFajlaComponent } from './vodja/ucitavanje-fajla/ucitavanje-fajla.component';
import { UnesiVremeComponent } from './delegat/unesi-vreme/unesi-vreme.component';
import { OdaveriTakmicenjeComponent } from './delegat/odaveri-takmicenje/odaveri-takmicenje.component';
import { UnesiRezultateComponent } from './delegat/unesi-rezultate/unesi-rezultate.component';
import { UnesiRezultateDaljinaComponent } from './delegat/unesi-rezultate-daljina/unesi-rezultate-daljina.component';
import { UnesiRezultateStreljastvoComponent } from './delegat/unesi-rezultate-streljastvo/unesi-rezultate-streljastvo.component';
import { UnesiRezultateTenisComponent } from './delegat/unesi-rezultate-tenis/unesi-rezultate-tenis.component';
import { ChangePassowrdComponent } from './unregistrated/change-passowrd/change-passowrd.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ZemljeComponent,
    SportistiComponent,
    MedaljeComponent,
    NotactiveComponent,
    LoginComponent,
    RegisterComponent,
    DelegatHomeComponent,
    OrganizatorHomeComponent,
    VodjaHomeComponent,
    RegisterVodjaComponent,
    RegisterDelegatComponent,
    ApproveUsersComponent,
    AddSportsComponent,
    AddFormaComponent,
    AddTakmicenjeComponent,
    CompleteTakmicenjeComponent,
    AddSportistaComponent,
    PrijavaSportistaComponent,
    UcitavanjeFajlaComponent,
    UnesiVremeComponent,
    OdaveriTakmicenjeComponent,
    UnesiRezultateComponent,
    UnesiRezultateDaljinaComponent,
    UnesiRezultateStreljastvoComponent,
    UnesiRezultateTenisComponent,
    ChangePassowrdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    //angular material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatPaginatorModule,
    MatDatepickerModule
    //kraj material

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ChartsModule} from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupAccompagnantComponent } from './components/signup-carer/signup-accompagnant.component';
import { SignupClientComponent } from './components/signup-client/signup-client.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { HttpClientModule } from "@angular/common/http";
import { SafePipe } from './pipes/safe.pipe';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AccompagnantsTableComponent } from './components/accompagnants-table/accompagnants-table.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { PublicationsTableComponent } from './components/publications-table/publications-table.component';
import { ProfilComponent } from './components/profil-carer/profil.component';
import { AddPublicationComponent } from './components/add-publication/add-publication.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { CarersComponent } from './components/carers/carers.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { ValidationInscriptionComponent } from './components/validation-inscription/validation-inscription.component';
import { ValidationLoginComponent } from './components/validation-login/validation-login.component';
import { ValidationUsersComponent } from './components/validation-users/validation-users.component';
import { ValidationModifierComponent } from './components/validation-modifier/validation-modifier.component';
import { NotifReservationClientComponent } from './components/notif-reservation-client/notif-reservation-client.component';
import { NotifCarerReservationComponent } from './components/notif-carer-reservation/notif-carer-reservation.component';
import { SearchComponent } from './components/search/search.component';
import { ClientNotificationsComponent } from './components/client-notifications/client-notifications.component';
import { ChartComponent } from './components/chart/chart.component';
import { EditProfilClientComponent } from './components/edit-profil-client/edit-profil-client.component';
import { CarersCarouselComponent } from './components/carers-carousel/carers-carousel.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    BannerComponent,
    SignupAccompagnantComponent,
    SignupClientComponent,
    SignupAdminComponent,
    SafePipe,
    DashboardAdminComponent,
    AccompagnantsTableComponent,
    ClientsTableComponent,
    PublicationsTableComponent,
    ProfilComponent,
    AddPublicationComponent,
    PublicationsComponent,
    CarersComponent,
    ClientInfoComponent,
    ValidationInscriptionComponent,
    ValidationLoginComponent,
    ValidationUsersComponent,
    ValidationModifierComponent,
    NotifReservationClientComponent,
    NotifCarerReservationComponent,
    SearchComponent,
    ClientNotificationsComponent,
    ChartComponent,
    EditProfilClientComponent,
    CarersCarouselComponent,
    AdminTableComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule,
    ChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

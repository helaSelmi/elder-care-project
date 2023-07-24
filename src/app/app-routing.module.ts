import { SearchComponent } from './components/search/search.component';
import { NotifCarerReservationComponent } from './components/notif-carer-reservation/notif-carer-reservation.component';
import { NotifReservationClientComponent } from './components/notif-reservation-client/notif-reservation-client.component';
import { ValidationModifierComponent } from './components/validation-modifier/validation-modifier.component';
import { ValidationLoginComponent } from './components/validation-login/validation-login.component';
import { ValidationInscriptionComponent } from './components/validation-inscription/validation-inscription.component';
import { ClientInfoComponent } from './components/client-info/client-info.component';
import { CarersComponent } from './components/carers/carers.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { AddPublicationComponent } from './components/add-publication/add-publication.component';
import { ProfilComponent } from './components/profil-carer/profil.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { SignupClientComponent } from './components/signup-client/signup-client.component';
import { SignupAccompagnantComponent } from './components/signup-carer/signup-accompagnant.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { ValidationUserService } from './services/validation-user.service';
import { ValidationUsersComponent } from './components/validation-users/validation-users.component';
import { ClientNotificationsComponent } from './components/client-notifications/client-notifications.component';
import { ChartComponent } from './components/chart/chart.component';
import { EditProfilClientComponent } from './components/edit-profil-client/edit-profil-client.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "connexion", component: LoginComponent },
  { path: "signupCarer", component: SignupComponent },
  { path: "signupClient", component: SignupClientComponent },
  { path: "signupAdmin", component: SignupAdminComponent },
  { path: "admin", component: DashboardAdminComponent },
  { path: "profilCarer/:id", component: ProfilComponent },
  { path: "addPublication", component: AddPublicationComponent },
  { path: "publications", component: PublicationsComponent },
  { path: "confirmedCarers", component: CarersComponent },
  { path: "clientInfo/:id", component: ClientInfoComponent },
  { path: "publicationsClient", component: ClientNotificationsComponent },
  { path: "chart", component: ChartComponent },
  { path: "editProfilClient", component: EditProfilClientComponent },
  { path: "validationInscrit", component: ValidationInscriptionComponent },
  { path: "validationlogin", component: ValidationLoginComponent },
  { path: "Validationusers", component: ValidationUsersComponent },
  { path: "modifierUser/:id", component: ValidationModifierComponent },
  { path: "reservationClient", component: NotifReservationClientComponent },
  { path: "reservationCarer", component: NotifCarerReservationComponent },
  { path: "searchCarer", component: SearchComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

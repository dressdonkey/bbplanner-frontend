import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routes } from './app.router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { TeamsComponent } from './teams/teams.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { AssociationsComponent } from './associations/associations.component';
import { RosterComponent } from './roster/roster.component';
import { PracticesComponent } from './practices/practices.component';
import { SeasonComponent } from './season/season.component';
import { LevelsComponent } from './levels/levels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { HomeComponent } from './home/home.component';

/* SERVICE IMPORTS */
import { SeasonsService } from './seasons/seasons.service';
import { AssociationsService } from './associations/associations.service';
import { TeamsService } from './teams/teams.service';
import { PlayersService } from './players/players.service';
import { AuthService } from './auth/auth.service';

/* Dialogs */
import { CreateSeasonFormComponent } from './seasons/create-season-form/create-season-form.component';
import { EditSeasonFormComponent } from './seasons/edit-season-form/edit-season-form.component';
import { CreateAssociationFormComponent } from './associations/create-association-form/create-association-form.component';
import { EditAssociationFormComponent } from './associations/edit-association-form/edit-association-form.component';
import { CreateTeamFormComponent } from './teams/create-team-form/create-team-form.component';
import { EditTeamFormComponent } from './teams/edit-team-form/edit-team-form.component';
import { CreatePlayerFormComponent } from './players/create-player-form/create-player-form.component';
import { EditPlayerFormComponent } from './players/edit-player-form/edit-player-form.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    SeasonsComponent,
    TeamsComponent,
    CompetitionsComponent,
    AssociationsComponent,
    RosterComponent,
    PracticesComponent,
    SeasonComponent,
    LevelsComponent,
    CreateSeasonFormComponent,
    EditSeasonFormComponent,
    FormComponent,
    SidenavComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ResetPasswordFormComponent,
    CreateAssociationFormComponent,
    EditAssociationFormComponent,
    CreateTeamFormComponent,
    EditTeamFormComponent,
    CreatePlayerFormComponent,
    EditPlayerFormComponent,
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    routes,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers : [
    SeasonsService,
    AssociationsService,
    TeamsService,
    PlayersService,
    AuthService
  ],
  entryComponents: [
    CreateSeasonFormComponent,
    EditSeasonFormComponent,
    CreateAssociationFormComponent,
    EditAssociationFormComponent,
    CreateTeamFormComponent,
    EditTeamFormComponent,
    CreatePlayerFormComponent,
    EditPlayerFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

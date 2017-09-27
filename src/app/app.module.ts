import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk';
import { NgUploaderModule } from 'ngx-uploader';

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
import { CompetitionsService } from './competitions/competitions.service';
import { LevelsService } from './levels/levels.service';

/* Dialogs */
import { CreateSeasonFormComponent } from './seasons/create-season-form/create-season-form.component';
import { EditSeasonFormComponent } from './seasons/edit-season-form/edit-season-form.component';
import { CreateAssociationFormComponent } from './associations/create-association-form/create-association-form.component';
import { EditAssociationFormComponent } from './associations/edit-association-form/edit-association-form.component';
import { CreateTeamFormComponent } from './teams/create-team-form/create-team-form.component';
import { EditTeamFormComponent } from './teams/edit-team-form/edit-team-form.component';
import { CreatePlayerFormComponent } from './players/create-player-form/create-player-form.component';
import { EditPlayerFormComponent } from './players/edit-player-form/edit-player-form.component';
import { DeletePlayerComponent } from './players/delete-player/delete-player.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CreateCompetitionFormComponent } from './competitions/create-competition-form/create-competition-form.component';
import { EditCompetitionFormComponent } from './competitions/edit-competition-form/edit-competition-form.component';
import { CreateLevelFormComponent } from './levels/create-level-form/create-level-form.component';
import { EditLevelFormComponent } from './levels/edit-level-form/edit-level-form.component';
import { EditPlayerFotoComponent } from './players/edit-player-foto/edit-player-foto.component';
import { EditCompetitionLogoComponent } from './competitions/edit-competition-logo/edit-competition-logo.component';
import { DeleteCompetitionComponent } from './competitions/delete-competition/delete-competition.component';
import { EditAssociationLogoComponent } from './associations/edit-association-logo/edit-association-logo.component';
import { DeleteAssociationComponent } from './associations/delete-association/delete-association.component';

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
    ToolbarComponent,
    CreateCompetitionFormComponent,
    EditCompetitionFormComponent,
    CreateLevelFormComponent,
    EditLevelFormComponent,
    DeletePlayerComponent,
    EditPlayerFotoComponent,
    EditCompetitionLogoComponent,
    DeleteCompetitionComponent,
    EditAssociationLogoComponent,
    DeleteAssociationComponent
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
    CdkTableModule,
    NgUploaderModule
  ],
  providers : [
    SeasonsService,
    AssociationsService,
    TeamsService,
    PlayersService,
    AuthService,
    CompetitionsService,
    LevelsService
  ],
  entryComponents: [
    CreateSeasonFormComponent,
    EditSeasonFormComponent,
    CreateAssociationFormComponent,
    EditAssociationFormComponent,
    CreateTeamFormComponent,
    EditTeamFormComponent,
    CreatePlayerFormComponent,
    EditPlayerFormComponent,
    CreateCompetitionFormComponent,
    EditCompetitionFormComponent,
    EditCompetitionLogoComponent,
    CreateLevelFormComponent,
    EditLevelFormComponent,
    DeletePlayerComponent,
    EditPlayerFotoComponent,
    DeleteCompetitionComponent,
    EditAssociationLogoComponent,
    DeleteAssociationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

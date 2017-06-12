import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { HomeComponent } from './home/home.component'


export const router: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'players', component: PlayersComponent },
    { path: 'seasons', component: SeasonsComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'associations', component: AssociationsComponent },
    { path: 'roster', component: RosterComponent },
    { path: 'practices', component: PracticesComponent },
    { path: 'season', component: SeasonComponent },
    { path: 'levels', component: LevelsComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register-user', component: RegisterFormComponent },
    { path: 'reset-password', component: ResetPasswordFormComponent },
    { path: 'home', component: HomeComponent }
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

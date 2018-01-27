import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { TeamsComponent } from './teams/teams.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { AssociationsComponent } from './associations/associations.component';
import { RosterComponent } from './roster/roster.component';
import { SeasonComponent } from './season/season.component';
import { LevelsComponent } from './levels/levels.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { HomeComponent } from './home/home.component'
import { PracticesComponent } from './practices/practices.component'
import { PracticeComponent } from './practices/practice/practice.component'
import { DrillComponent } from './drill/drill.component'
import { PlaysComponent } from './plays/plays.component'
import { AttendanceComponent } from "./practices/attendance/attendance.component";


export const router: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'players', component: PlayersComponent },
    { path: 'seasons', component: SeasonsComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'competitions', component: CompetitionsComponent },
    { path: 'associations', component: AssociationsComponent },
    { path: 'roster/season/:id', component: RosterComponent },
    { path: 'season', component: SeasonComponent },
    { path: 'levels', component: LevelsComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register-user', component: RegisterFormComponent },
    { path: 'reset-password', component: ResetPasswordFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'practice/:id', component: PracticeComponent },
    { path: 'practices/season/:id', component: PracticesComponent },
    { path: 'drills', component: DrillComponent },
    { path: 'plays', component: PlaysComponent },
    { path: 'attendance/:practiceID', component: AttendanceComponent }
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

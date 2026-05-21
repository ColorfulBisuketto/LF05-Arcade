import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClickerComponent } from './clicker/clicker.component';
import { LeaderboardComponent } from './home/leaderboard.component';

export const routes: Routes = [
    { path: '', component: LeaderboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'clicker', component: ClickerComponent },
];

import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-navbar',
  imports: [ToggleSwitchModule, FormsModule, RouterLink],
  standalone: true,
  template: `
  <span>Toggle dark mode
    <p-toggleswitch
      [ngModel]="themeService.theme() === 'dark'"
      (ngModelChange)="themeService.toggle()">
    </p-toggleswitch>
  </span>
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/login">Login</a>
    <a routerLink="/clicker">Play Clicker</a>
  </nav>
  <p>{{loginService.isUserSet() ? loginService.userName() : "Username not set please log in."}}</p>
  `,
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
    readonly themeService = inject(ThemeService);
    readonly loginService = inject(LoginService);

    darkMode: boolean = false;
}
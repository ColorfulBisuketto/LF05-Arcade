import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { ThemeService } from '../services/theme.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule
  ],
  template: `
    <header class="app-navbar">
      <div class="nav-left">
        <a routerLink="/" class="brand">PurpleApp</a>

        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active">Home</a>
          <a routerLink="/clicker" routerLinkActive="active">Clicker</a>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </nav>
      </div>

      <div class="nav-right">
        <button class="nav-action theme-toggle" type="button">
          <span class="label">Dark</span>

          <p-toggleswitch
            [ngModel]="themeService.theme() === 'dark'"
            (ngModelChange)="themeService.toggle()"/>
        </button>

        <a routerLink="/login" routerLinkActive="active" class="nav-action user-button">
          {{
            loginService.isUserSet()
              ? loginService.userName()
              : 'Not logged in'
          }}
        </a>
      </div>
    </header>
  `,
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  protected themeService = inject(ThemeService);
  protected loginService = inject(LoginService);
}
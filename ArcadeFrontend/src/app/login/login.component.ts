import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule
  ],
  template: `
    <div class="login-page">
      <form class="app-card login-card" (ngSubmit)="submit()">
        <div class="app-card-header">
          <h2 class="app-card-title">Login</h2>
        </div>

        <div class="app-card-content">
          <div class="app-field">
            <label class="app-label" for="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              class="app-input"
              pInputText
              [(ngModel)]="userName"
              name="username"
              required
              placeholder="Enter username"/>
          </div>
        </div>

        <div class="app-card-footer">
          <button
            type="submit"
            class="app-button app-button-primary">Submit</button>

          <button
          (click)="logout()"
            type="button"
            class="app-button app-button-secondary">Log out</button>
        </div>
      </form>
    </div>
  `,
  styleUrl: './login.scss',
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  userName = signal<string>('');
  submitting = signal(false);

  logout(){
    this.loginService.unsetUser();
  }

  async submit(): Promise<void> {
    if (this.submitting()) return;

    this.submitting.set(true);

    const name = this.userName().trim();
    if (!name) {
      this.submitting.set(false);
      return;
    }

    this.loginService.setUser(name);

    await this.router.navigate(['/']);

    this.submitting.set(false);
  }
}
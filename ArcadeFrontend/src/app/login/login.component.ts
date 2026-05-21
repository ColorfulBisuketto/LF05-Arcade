import { Component, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FormsModule ],
  template: `
    <p>login works!</p>
    <input type="text" pInputText [(ngModel)]="userName" />
  `,
  styleUrl: './login.scss',
})
export class LoginComponent {
  protected loginService = inject(LoginService);
  public get userName(): string {
    return this.loginService.userName() ?? '';
  }
  public set userName(value) {
    if (value !== ''){
      this.loginService.userName.set(value);
    }
  }
}

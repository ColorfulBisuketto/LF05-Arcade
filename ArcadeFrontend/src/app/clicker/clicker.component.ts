import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-clicker',
  standalone: true,
  template: `
    <div class="clicker-page">

      <div class="app-card clicker-card">

        <div class="app-card-header">
          <h2 class="app-card-title">
            Clicker Game
          </h2>
        </div>

        <div class="app-card-content">

          <div class="score-block">
            <div class="label">Player</div>
            <div class="value">
              {{ username() || 'Anonymous' }}
            </div>
          </div>

          <div class="score-block">
            <div class="label">Score</div>
            <div class="value score">
              {{ score() }}
            </div>
          </div>

        </div>

        <div class="app-card-footer">

          <button
            class="app-button app-button-primary"
            (click)="increment()"
          >
            Click me
          </button>

          <button
            class="app-button app-button-secondary"
            (click)="submitScore()"
          >
            Submit Score
          </button>

        </div>

      </div>

    </div>
  `,
  styleUrl: './clicker.scss',
})
export class ClickerComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  score = signal(0);

  username = computed(() => {
    const userName = this.loginService.userName();
    return this.loginService.isUserSet()
      ? userName
      : ''}
  );

  increment(): void {
    this.score.update(v => v + 1);
  }

  submitScore(): void {
    const payload = {
      username: this.username(),
      score: this.score()
    };

    console.log('Submitting score:', payload);

    // TODO: GameService.submitScore(payload)

    this.router.navigate(['/']);
  }
}
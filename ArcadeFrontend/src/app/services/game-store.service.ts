import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';

export interface LeaderBoardResponse {
  scores: ScoreEntry[]
}

export interface ScoreEntry {
  id: number;
  username: string;
  score: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  private http = inject(HttpClient);
  private loginService = inject(LoginService);
  private readonly API = '/api/game';

  // ==========================================================================
  // STATE
  // ==========================================================================

  private readonly _leaderboard = signal<ScoreEntry[]>([]);

  // ==========================================================================
  // READONLY SELECTORS
  // ==========================================================================

  readonly leaderboard = this._leaderboard.asReadonly();

  readonly top3 = computed(() =>
    [...this._leaderboard()]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  );

  // ==========================================================================
  // INITIAL LOAD
  // ==========================================================================

  async loadLeaderboard(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<LeaderBoardResponse>(`${this.API}/leaderboard`)
    );

    this._leaderboard.set(data.scores ?? []);
  }

  // ==========================================================================
  // USER ACTIONS
  // ==========================================================================

  // ==========================================================================
  // SCORE SUBMISSION
  // ==========================================================================

  async submitScore(score: number): Promise<void> {
    if (!this.loginService.isUserSet()) return;
    const username = this.loginService.userName();

    if (!username || score <= 0) return;

    await firstValueFrom(
      this.http.post(`${this.API}/submit`, {
        username,
        score,
      })
    );

    await this.loadLeaderboard();
  }
}
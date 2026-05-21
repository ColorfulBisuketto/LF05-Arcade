import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ScoreEntry {
  username: string;
  score: number;
  timestamp: number;
}

export interface GameStateDto {
  username: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {

  private http = inject(HttpClient);

  private readonly API = '/api/game';

  // ==========================================================================
  // STATE
  // ==========================================================================

  private readonly _username = signal<string>('');
  private readonly _score = signal<number>(0);
  private readonly _leaderboard = signal<ScoreEntry[]>([]);

  // ==========================================================================
  // READONLY SELECTORS
  // ==========================================================================

  readonly username = this._username.asReadonly();
  readonly score = this._score.asReadonly();
  readonly leaderboard = this._leaderboard.asReadonly();

  readonly top3 = computed(() =>
    [...this._leaderboard()]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  );

  readonly hasUser = computed(() =>
    this._username().length > 0
  );

  // ==========================================================================
  // INITIAL LOAD
  // ==========================================================================

  async loadInitialState(): Promise<void> {
    const state = await firstValueFrom(
      this.http.get<GameStateDto>(`${this.API}/state`)
    );

    this._username.set(state.username ?? '');
    this._score.set(state.score ?? 0);
  }

  async loadLeaderboard(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<ScoreEntry[]>(`${this.API}/leaderboard`)
    );

    this._leaderboard.set(data ?? []);
  }

  // ==========================================================================
  // USER ACTIONS
  // ==========================================================================

  async setUsername(name: string): Promise<void> {
    const clean = name.trim();

    this._username.set(clean);

    await firstValueFrom(
      this.http.put(`${this.API}/state`, {
        username: clean,
        score: this._score(),
      })
    );
  }

  incrementScore(amount = 1): void {
    this._score.update(v => v + amount);
  }

  resetScore(): void {
    this._score.set(0);
  }

  // ==========================================================================
  // SCORE SUBMISSION
  // ==========================================================================

  async submitScore(): Promise<void> {
    const username = this._username();
    const score = this._score();

    if (!username || score <= 0) return;

    await firstValueFrom(
      this.http.post(`${this.API}/submit`, {
        username,
        score,
        timestamp: Date.now(),
      })
    );

    this.resetScore();
    await this.loadLeaderboard();
  }
}
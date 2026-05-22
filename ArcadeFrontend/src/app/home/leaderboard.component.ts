import { CommonModule } from '@angular/common';
import { Component, signal, computed, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { GameStoreService } from '../services/game-store.service';

export interface ScoreEntry {
  username: string;
  score: number;
  timestamp: number;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [TableModule, CommonModule],
  template: `
    <div class="leaderboard-page">
      <div class="app-card leaderboard-card">
        <div class="app-card-header">
          <h2 class="app-card-title">Leaderboard</h2>
        </div>

        <div class="app-card-content">
          @if (gameService.top3().length) {
            <div class="top3">
              @if(gameService.top3()[1]){
                <div class="top-item second">
                  <div class="rank">2</div>
                  <div class="name">{{ gameService.top3()[1].username }}</div>
                  <div class="score">{{ gameService.top3()[1].score }}</div>
                </div>
              }

              @if(gameService.top3()[0]){
                <div class="top-item first">
                  <div class="rank">1</div>
                  <div class="name">{{ gameService.top3()[0].username }}</div>
                  <div class="score">{{ gameService.top3()[0].score }}</div>
                </div>
              }

              @if(gameService.top3()[2]){
                <div class="top-item third">
                  <div class="rank">3</div>
                  <div class="name">{{ gameService.top3()[2].username }}</div>
                  <div class="score">{{ gameService.top3()[2].score }}</div>
                </div>
              }
            </div>
          }

          <p-table
            [value]="gameService.leaderboard()"
            [paginator]="true"
            [rows]="5">
            <ng-template pTemplate="header">
              <tr><th>#</th><th>Username</th><th>Score</th><th>Time</th></tr>
            </ng-template>

            <ng-template pTemplate="body" let-row let-i="rowIndex">
              <tr>
                <td>{{ i + 1 }}</td>
                <td>{{ row.username }}</td>
                <td class="score">{{ row.score }}</td>
                <td>{{ format(row.timestamp) }}</td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
  styleUrl: './leaderboard.scss',
})
export class LeaderboardComponent {
  protected gameService = inject(GameStoreService);
  
  constructor(){
    this.gameService.loadLeaderboard();
  }

  format(ts: number): string {
    return new Date(ts).toLocaleString();
  }
}
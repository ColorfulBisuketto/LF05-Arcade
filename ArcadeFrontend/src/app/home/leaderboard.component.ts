import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { TableModule } from 'primeng/table';

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

          <!-- TOP 3 -->
          @if (top3().length) {
            <div class="top3">

            @if(top3()[1]){
              <div class="top-item second">
                <div class="rank">2</div>
                <div class="name">{{ top3()[1].username }}</div>
                <div class="score">{{ top3()[1].score }}</div>
              </div>
            }

            @if(top3()[0]){
              <div class="top-item first">
                <div class="rank">1</div>
                <div class="name">{{ top3()[0].username }}</div>
                <div class="score">{{ top3()[0].score }}</div>
              </div>
            }

            @if(top3()[2]){
              <div class="top-item third">
                <div class="rank">3</div>
                <div class="name">{{ top3()[2].username }}</div>
                <div class="score">{{ top3()[2].score }}</div>
              </div>
            }
            </div>
          }

          <!-- TABLE -->
          <p-table
            [value]="scores()"
            [paginator]="true"
            [rows]="5"
          >
            <ng-template pTemplate="header">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
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

  scores = signal<ScoreEntry[]>([
    { username: 'Alice', score: 120, timestamp: Date.now() },
    { username: 'Bob', score: 90, timestamp: Date.now() },
    { username: 'Charlie', score: 70, timestamp: Date.now() },
    { username: 'Dave', score: 40, timestamp: Date.now() },
  ]);

  top3 = computed(() =>
    [...this.scores()]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  );

  format(ts: number): string {
    return new Date(ts).toLocaleString();
  }
}
import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme = signal<ThemeMode>('dark');

  constructor() {
    const saved = localStorage.getItem('theme') as ThemeMode | null;

    if (saved) {
      this.setTheme(saved);
      return;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    this.setTheme(prefersDark ? 'dark' : 'light');
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    localStorage.setItem('theme', theme);
  }

  toggle(): void {
    this.setTheme(
      this.theme() === 'dark'
        ? 'light'
        : 'dark'
    );
  }
}
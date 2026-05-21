import {
  Injectable,
  computed,
  effect,
  signal,
} from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public readonly userName = signal<string|undefined>(this.initialUser());
  public readonly isUserSet = computed<boolean>(() => {
    return this.userName() != undefined;
  });

  constructor() {
    effect(() => {
      const currentUser = this.userName();

      if (currentUser)
      {
        sessionStorage.setItem('userName', currentUser);
      }
    });
  }

  public setUser(userName: string): void {
    this.userName.set(userName);
  }

  public unsetUser(): void {
    this.userName.set(undefined);
    sessionStorage.removeItem('userName');
  }

  private initialUser(): string | undefined {
    return localStorage.getItem('userName') as string | undefined;
  }
}
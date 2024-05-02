import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {}

  getTheme(): string {
    const theme = localStorage.getItem(this.THEME_KEY);
    return theme ? theme : 'dark';
  }

  setTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);

    this.setThemeMode(theme);
  }

  setThemeMode(theme: string): void {
    const html = this.document.documentElement;
    html.setAttribute('data-mode', theme);
  }
}

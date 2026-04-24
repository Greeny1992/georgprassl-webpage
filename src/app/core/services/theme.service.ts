import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly theme = signal<Theme>(this.resolveInitial());

  constructor() {
    this.apply(this.theme());
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.apply(next);
    try {
      this.doc.defaultView?.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private mode etc.)
    }
  }

  private apply(theme: Theme): void {
    const root = this.doc.documentElement;
    root.setAttribute('data-theme', theme);
  }

  private resolveInitial(): Theme {
    const win = this.doc.defaultView;
    try {
      const stored = win?.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // ignore
    }
    if (win?.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }
}

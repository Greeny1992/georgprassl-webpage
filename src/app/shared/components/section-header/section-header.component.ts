import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

/**
 * Reusable section header with title and optional subtitle.
 * Used for major page sections (Education, Employment, etc.)
 */
@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [NgIf],
  template: `
    <header class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
    </header>
  `,
  styles: [
    `
      .section-header {
        margin-bottom: 24px;
      }

      .section-title {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -0.03em;
        margin: 0 0 8px 0;
        color: var(--mat-sys-primary, #2563eb);
        position: relative;
        display: inline-block;
      }

      .section-title::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(
          to right,
          var(--mat-sys-primary, #2563eb),
          transparent
        );
        border-radius: 2px;
      }

      .section-subtitle {
        font-size: 14px;
        font-weight: 400;
        color: var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.55));
        margin: 0;
        line-height: 1.6;
      }
    `,
  ],
})
export class SectionHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}

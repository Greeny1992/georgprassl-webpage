import { Component, Input } from '@angular/core';


/**
 * Reusable section header with title and optional subtitle.
 * Used for major page sections (Education, Employment, etc.)
 */
@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [],
  template: `
    <header class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      @if (subtitle) {
        <p class="section-subtitle">{{ subtitle }}</p>
      }
    </header>
    `,
  styles: [
    `
      .section-header {
        margin-bottom: 32px;
      }

      .section-title {
        font-size: 32px;
        font-weight: 700;
        letter-spacing: -0.03em;
        margin: 0 0 12px 0;
        color: var(--app-text-heading);
        position: relative;
        display: inline-block;
        font-family: 'Source Serif 4', Georgia, serif;
      }

      .section-title::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 60px;
        height: 4px;
        background: linear-gradient(
          to right,
          var(--app-accent),
          var(--app-accent-light)
        );
        border-radius: 2px;
      }

      .section-subtitle {
        font-size: 15px;
        font-weight: 500;
        color: var(--app-muted);
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

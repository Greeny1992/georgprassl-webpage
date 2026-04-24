import { Component, input } from '@angular/core';
import { ResumeBasics } from '../../../../core/models/resume.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-mark">GP</span>
          <span>{{ basics().name }}</span>
        </div>
        <p class="footer-meta">
          © {{ year }} {{ basics().name }} · {{ basics().tagline || 'IT & Software Consulting' }}
        </p>
        <nav class="footer-links" aria-label="Footer">
          <a href="#top">Top</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .footer {
        padding: 40px 24px;
        border-top: 1px solid var(--app-border);
        background: var(--app-surface-subtle);
      }
      .footer-inner {
        max-width: var(--app-container);
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        gap: 18px 28px;
        align-items: center;
        justify-content: space-between;
      }
      .footer-brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 700;
        color: var(--app-text-heading);
      }
      .footer-mark {
        width: 28px;
        height: 28px;
        display: inline-grid;
        place-items: center;
        background: linear-gradient(
          135deg,
          var(--app-accent) 0%,
          var(--app-accent-soft) 100%
        );
        color: var(--app-accent-contrast);
        border-radius: 8px;
        font-size: 12px;
        font-weight: 800;
      }
      .footer-meta {
        margin: 0;
        font-size: 13.5px;
        color: var(--app-muted);
      }
      .footer-links {
        display: inline-flex;
        gap: 18px;
        font-size: 14px;
      }
      .footer-links a {
        color: var(--app-muted);
        &:hover {
          color: var(--app-accent);
        }
      }
    `,
  ],
})
export class FooterComponent {
  readonly basics = input.required<ResumeBasics>();
  readonly year = new Date().getFullYear();
}

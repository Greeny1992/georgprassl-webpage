import { Component, input } from '@angular/core';

import { TimelineItemData } from '../timeline-item/timeline-item.component';

/**
 * Modern vertical timeline with expandable cards.
 * Better for readability and mobile experience.
 */
@Component({
  selector: 'app-vertical-timeline',
  standalone: true,
  imports: [],
  template: `
    <div class="vertical-timeline" role="list">
      @for (item of items(); track trackByTitle(i, item); let i = $index) {
        <div
          class="timeline-entry"
          [class.timeline-entry--expanded]="expandedIndex === i"
          role="listitem"
          >
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            @if (i < items().length - 1) {
              <div class="timeline-line"></div>
            }
          </div>
          <div class="timeline-content">
            <div class="timeline-header" (click)="toggleExpand(i)">
              @if (item.logoUrl) {
                <img
                  [src]="item.logoUrl"
                  [alt]="item.subtitle + ' logo'"
                  class="timeline-logo"
                  loading="lazy"
                  />
              }
              <div class="timeline-header-main">
                <h3 class="timeline-title">{{ item.title }}</h3>
                <p class="timeline-subtitle">{{ item.subtitle }}</p>
              </div>
              <div class="timeline-meta">
                <span class="timeline-date">{{ item.dateRange }}</span>
                <button
                  class="timeline-toggle"
                  [attr.aria-expanded]="expandedIndex === i"
                  aria-label="Toggle details"
                  >
                  <span class="toggle-icon">{{
                    expandedIndex === i ? '−' : '+'
                  }}</span>
                </button>
              </div>
            </div>
            @if (expandedIndex === i) {
              <div class="timeline-details">
                @if (item.details) {
                  <p class="timeline-description">
                    {{ item.details }}
                  </p>
                }
                @if (item.highlights && item.highlights.length) {
                  <ul
                    class="timeline-highlights"
                    >
                    @for (highlight of item.highlights; track highlight) {
                      <li>{{ highlight }}</li>
                    }
                  </ul>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
    `,
  styleUrls: ['./vertical-timeline.component.scss'],
})
export class VerticalTimelineComponent {
  readonly items = input<TimelineItemData[]>([]);
  readonly expandFirst = input(true);

  expandedIndex: number | null = null;

  ngOnInit() {
    if (this.expandFirst() && this.items().length > 0) {
      this.expandedIndex = 0;
    }
  }

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  trackByTitle(_index: number, item: TimelineItemData): string {
    return item.title;
  }
}

import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TimelineItemData } from '../timeline-item/timeline-item.component';

/**
 * Modern vertical timeline with expandable cards.
 * Better for readability and mobile experience.
 */
@Component({
  selector: 'app-vertical-timeline',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="vertical-timeline" role="list">
      <div
        *ngFor="let item of items; let i = index; trackBy: trackByTitle"
        class="timeline-entry"
        [class.timeline-entry--expanded]="expandedIndex === i"
        role="listitem"
      >
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          <div class="timeline-line" *ngIf="i < items.length - 1"></div>
        </div>

        <div class="timeline-content">
          <div class="timeline-header" (click)="toggleExpand(i)">
            <img
              *ngIf="item.logoUrl"
              [src]="item.logoUrl"
              [alt]="item.subtitle + ' logo'"
              class="timeline-logo"
              loading="lazy"
            />
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

          <div class="timeline-details" *ngIf="expandedIndex === i">
            <p class="timeline-description" *ngIf="item.details">
              {{ item.details }}
            </p>
            <ul
              class="timeline-highlights"
              *ngIf="item.highlights && item.highlights.length"
            >
              <li *ngFor="let highlight of item.highlights">{{ highlight }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./vertical-timeline.component.scss'],
})
export class VerticalTimelineComponent {
  @Input() items: TimelineItemData[] = [];
  @Input() expandFirst = true;

  expandedIndex: number | null = null;

  ngOnInit() {
    if (this.expandFirst && this.items.length > 0) {
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

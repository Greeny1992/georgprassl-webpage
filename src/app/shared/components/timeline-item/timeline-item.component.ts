import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface TimelineItemData {
  title: string;
  subtitle: string;
  dateRange: string;
  details?: string;
  highlights?: string[];
  _sortStart?: string;
  _sortEnd?: string;
}

/**
 * Individual timeline milestone card.
 * Alternates above/below the center line via CSS nth-child.
 */
@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <article
      class="timeline-item"
      [attr.tabindex]="0"
      [attr.aria-label]="item.title + ', ' + item.dateRange"
    >
      <div class="timeline-card">
        <div class="timeline-card-title">{{ item.title }}</div>
        <div class="timeline-card-subtitle">{{ item.subtitle }}</div>
        <div class="timeline-card-date">{{ item.dateRange }}</div>
        <div class="timeline-card-details" *ngIf="item.details">
          {{ item.details }}
        </div>
        <ul
          class="timeline-card-highlights"
          *ngIf="item.highlights && item.highlights.length"
        >
          <li *ngFor="let highlight of item.highlights">{{ highlight }}</li>
        </ul>
      </div>
    </article>
  `,
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent {
  @Input() item!: TimelineItemData;
}

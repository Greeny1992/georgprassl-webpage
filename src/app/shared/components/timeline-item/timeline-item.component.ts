import { Component, Input } from '@angular/core';


export interface TimelineItemData {
  title: string;
  subtitle: string;
  dateRange: string;
  details?: string;
  highlights?: string[];
  logoUrl?: string;
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
  imports: [],
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
        @if (item.details) {
          <div class="timeline-card-details">
            {{ item.details }}
          </div>
        }
        @if (item.highlights && item.highlights.length) {
          <ul
            class="timeline-card-highlights"
            >
            @for (highlight of item.highlights; track highlight) {
              <li>{{ highlight }}</li>
            }
          </ul>
        }
      </div>
    </article>
    `,
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent {
  @Input() item!: TimelineItemData;
}

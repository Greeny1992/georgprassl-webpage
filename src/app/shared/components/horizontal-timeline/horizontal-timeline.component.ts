import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  TimelineItemComponent,
  TimelineItemData,
} from '../timeline-item/timeline-item.component';
import { HorizontalScrollHijackDirective } from '../../directives/horizontal-scroll-hijack.directive';

/**
 * Horizontal timeline container with scroll hijacking.
 * Displays milestones along a center line with alternating card positions.
 */
@Component({
  selector: 'app-horizontal-timeline',
  standalone: true,
  imports: [NgFor, TimelineItemComponent, HorizontalScrollHijackDirective],
  template: `
    <div
      class="horizontal-timeline"
      appHorizontalScrollHijack
      role="region"
      [attr.aria-label]="'Timeline for ' + type"
    >
      <div class="timeline-track">
        <div class="timeline-center-line"></div>
        <div class="timeline-items">
          <app-timeline-item
            *ngFor="let item of items; trackBy: trackByTitle"
            [item]="item"
          ></app-timeline-item>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./horizontal-timeline.component.scss'],
})
export class HorizontalTimelineComponent {
  @Input() items: TimelineItemData[] = [];
  @Input() type: 'education' | 'employment' = 'employment';

  trackByTitle(_index: number, item: TimelineItemData): string {
    return item.title;
  }
}

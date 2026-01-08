import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CvService } from '../cv/cv.service';
import { CvCourse, CvData, CvEducation, CvEmployment } from '../cv/cv.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly cv$ = this.cvService.cv$;

  @ViewChild('employmentTimeline', { read: ElementRef })
  private employmentTimeline?: ElementRef<HTMLElement>;

  @ViewChild('educationTimeline', { read: ElementRef })
  private educationTimeline?: ElementRef<HTMLElement>;

  private activeTimeline: 'employment' | 'education' | null = null;
  private intersectionObserver?: IntersectionObserver;
  private readonly wheelListener = (event: WheelEvent) => this.onWheel(event);

  constructor(
    private readonly cvService: CvService,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('wheel', this.wheelListener, { passive: false });

      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          // Prefer the entry with highest intersection ratio.
          let best: { id: 'employment' | 'education'; ratio: number } | null =
            null;
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }
            const target = entry.target as HTMLElement;
            const id = target.dataset['timelineId'] as
              | 'employment'
              | 'education'
              | undefined;
            if (!id) {
              continue;
            }
            const ratio = entry.intersectionRatio;
            if (!best || ratio > best.ratio) {
              best = { id, ratio };
            }
          }

          this.activeTimeline = best && best.ratio >= 0.6 ? best.id : null;
        },
        { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
      );

      const employmentEl = this.employmentTimeline?.nativeElement;
      const educationEl = this.educationTimeline?.nativeElement;
      if (employmentEl) {
        employmentEl.dataset['timelineId'] = 'employment';
        this.intersectionObserver.observe(employmentEl);
      }
      if (educationEl) {
        educationEl.dataset['timelineId'] = 'education';
        this.intersectionObserver.observe(educationEl);
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.wheelListener);
    this.intersectionObserver?.disconnect();
  }

  trackByIndex(index: number): number {
    return index;
  }

  formatRange(start: string, end?: string): string {
    const startLabel = this.formatMonth(start);
    const endLabel = end ? this.formatMonth(end) : 'Present';
    return `${startLabel} — ${endLabel}`;
  }

  formatCourse(course: CvCourse): string {
    return `${course.provider} · ${this.formatMonth(course.date)}`;
  }

  private formatMonth(value: string): string {
    const [yearRaw, monthRaw] = value.split('-');
    const year = Number(yearRaw);
    const month = Number(monthRaw);
    if (!Number.isFinite(year) || !Number.isFinite(month)) {
      return value;
    }

    const date = new Date(Date.UTC(year, month - 1, 1));
    return new Intl.DateTimeFormat(undefined, {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  employmentItems(cv: CvData): CvEmployment[] {
    return [...cv.employment].sort((a, b) =>
      a.start < b.start ? -1 : a.start > b.start ? 1 : 0
    );
  }

  educationItems(cv: CvData): CvEducation[] {
    return [...cv.education].sort((a, b) =>
      a.start < b.start ? -1 : a.start > b.start ? 1 : 0
    );
  }

  private onWheel(event: WheelEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    if (event.ctrlKey) {
      // Allow browser zoom.
      return;
    }

    const timelineEl = this.getActiveTimelineElement();
    if (!timelineEl) {
      return;
    }

    // Convert vertical scroll to horizontal scroll while we can still scroll horizontally.
    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
    if (delta === 0) {
      return;
    }

    const maxScrollLeft = timelineEl.scrollWidth - timelineEl.clientWidth;
    const atStart = timelineEl.scrollLeft <= 0;
    const atEnd = timelineEl.scrollLeft >= maxScrollLeft - 1;

    // If user is trying to go beyond the horizontal bounds, allow vertical page scroll.
    if ((delta < 0 && atStart) || (delta > 0 && atEnd)) {
      return;
    }

    event.preventDefault();
    timelineEl.scrollLeft += delta;
  }

  private getActiveTimelineElement(): HTMLElement | null {
    if (this.activeTimeline === 'employment') {
      return this.employmentTimeline?.nativeElement ?? null;
    }
    if (this.activeTimeline === 'education') {
      return this.educationTimeline?.nativeElement ?? null;
    }
    return null;
  }
}

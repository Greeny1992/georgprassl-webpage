import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResumeDataService } from '../../core/services/resume-data.service';
import {
  ResumeData,
  EmploymentItem,
  EducationItem,
} from '../../core/models/resume.models';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { VerticalTimelineComponent } from '../../shared/components/vertical-timeline/vertical-timeline.component';
import { TimelineItemData } from '../../shared/components/timeline-item/timeline-item.component';

/**
 * Main resume page component.
 * Loads resume data and renders hero, profile, timelines, skills, etc.
 */
@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [
    AsyncPipe,
    SectionHeaderComponent,
    VerticalTimelineComponent
],
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
})
export class ResumePageComponent implements OnInit {
  private resumeDataService = inject(ResumeDataService);

  resumeData$!: Observable<ResumeData>;
  educationTimeline$!: Observable<TimelineItemData[]>;
  employmentTimeline$!: Observable<TimelineItemData[]>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  ngOnInit(): void {
    this.resumeData$ = this.resumeDataService.resumeData$;

    // Transform education data to timeline format
    this.educationTimeline$ = this.resumeData$.pipe(
      map((data) => this.transformEducation(data.education)),
    );

    // Transform employment data to timeline format
    this.employmentTimeline$ = this.resumeData$.pipe(
      map((data) => this.transformEmployment(data.employment)),
    );
  }

  private transformEducation(items: EducationItem[]): TimelineItemData[] {
    return items
      .map((item) => ({
        title: item.degree,
        subtitle: item.institution,
        dateRange: this.formatDateRange(item.start, item.end),
        details: item.focus,
        logoUrl: item.logoUrl,
        _sortStart: item.start,
        _sortEnd: item.end || '9999-99', // Present items treated as future for sorting
      }))
      .sort((a, b) => {
        // Sort by start date DESCENDING (newest on left)
        const startCompare = b._sortStart.localeCompare(a._sortStart);
        if (startCompare !== 0) return startCompare;
        // Tiebreaker: end date descending
        return b._sortEnd.localeCompare(a._sortEnd);
      });
  }

  private transformEmployment(items: EmploymentItem[]): TimelineItemData[] {
    return items
      .map((item) => ({
        title: item.title,
        subtitle: item.company,
        dateRange: this.formatDateRange(item.start, item.end),
        highlights: item.highlights,
        logoUrl: item.logoUrl,
        _sortStart: item.start,
        _sortEnd: item.end || '9999-99', // Present items treated as future for sorting
      }))
      .sort((a, b) => {
        // Sort by start date DESCENDING (newest on left)
        const startCompare = b._sortStart.localeCompare(a._sortStart);
        if (startCompare !== 0) return startCompare;
        // Tiebreaker: end date descending
        return b._sortEnd.localeCompare(a._sortEnd);
      });
  }

  private formatDateRange(start: string, end?: string): string {
    const formatMonth = (dateStr: string): string => {
      const [year, month] = dateStr.split('-');
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    };

    const startFormatted = formatMonth(start);
    const endFormatted = end ? formatMonth(end) : 'Present';
    return `${startFormatted} – ${endFormatted}`;
  }

  // Helper method to get skill name (supports both string and SkillItem)
  getSkillName(skill: string | any): string {
    return typeof skill === 'string' ? skill : skill.name;
  }

  // Helper method to get skill level (supports both string and SkillItem)
  getSkillLevel(skill: string | any): number | undefined {
    return typeof skill === 'string' ? undefined : skill.level;
  }

  // Render stars for skill/language levels (1-5)
  renderStars(level: number | undefined): string {
    if (!level) return '';
    const fullStars = '★'.repeat(level);
    const emptyStars = '☆'.repeat(5 - level);
    return fullStars + emptyStars;
  }
}

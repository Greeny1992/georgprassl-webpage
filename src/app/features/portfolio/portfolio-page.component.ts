import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResumeDataService } from '../../core/services/resume-data.service';
import {
  EducationItem,
  EmploymentItem,
  ResumeData,
} from '../../core/models/resume.models';
import { TimelineItemData } from '../../shared/models/timeline.models';
import { VerticalTimelineComponent } from '../../shared/components/vertical-timeline/vertical-timeline.component';
import { InViewDirective } from '../../shared/directives/in-view.directive';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    ProjectsComponent,
    AboutComponent,
    TechStackComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    VerticalTimelineComponent,
    InViewDirective,
  ],
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
})
export class PortfolioPageComponent implements OnInit {
  private readonly resumeDataService = inject(ResumeDataService);

  resume$!: Observable<ResumeData>;
  employmentTimeline$!: Observable<TimelineItemData[]>;
  educationTimeline$!: Observable<TimelineItemData[]>;

  ngOnInit(): void {
    this.resume$ = this.resumeDataService.resumeData$;

    this.employmentTimeline$ = this.resume$.pipe(
      map((data) => this.toEmploymentTimeline(data.employment)),
    );
    this.educationTimeline$ = this.resume$.pipe(
      map((data) => this.toEducationTimeline(data.education)),
    );
  }

  private toEmploymentTimeline(items: EmploymentItem[]): TimelineItemData[] {
    return items
      .map((item) => ({
        title: item.title,
        subtitle: item.company,
        dateRange: this.formatDateRange(item.start, item.end),
        highlights: item.highlights ?? [],
        logoUrl: item.logoUrl,
        _sortStart: item.start,
        _sortEnd: item.end || '9999-99',
      }))
      .sort((a, b) => {
        const s = b._sortStart.localeCompare(a._sortStart);
        return s !== 0 ? s : b._sortEnd.localeCompare(a._sortEnd);
      });
  }

  private toEducationTimeline(items: EducationItem[]): TimelineItemData[] {
    return items
      .map((item) => ({
        title: item.degree,
        subtitle: item.institution,
        dateRange: this.formatDateRange(item.start, item.end),
        details: item.focus,
        logoUrl: item.logoUrl,
        _sortStart: item.start,
        _sortEnd: item.end || '9999-99',
      }))
      .sort((a, b) => {
        const s = b._sortStart.localeCompare(a._sortStart);
        return s !== 0 ? s : b._sortEnd.localeCompare(a._sortEnd);
      });
  }

  private formatDateRange(start: string, end?: string): string {
    const months = [
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
    const fmt = (d: string) => {
      const [y, m] = d.split('-');
      return `${months[parseInt(m, 10) - 1]} ${y}`;
    };
    return `${fmt(start)} – ${end ? fmt(end) : 'Present'}`;
  }
}

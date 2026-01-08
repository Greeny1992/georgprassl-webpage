import { Route } from '@angular/router';
import { ResumePageComponent } from './features/resume/resume-page.component';

export const ROUTES: Route[] = [
  { path: '', component: ResumePageComponent },
  { path: '**', redirectTo: '' },
];

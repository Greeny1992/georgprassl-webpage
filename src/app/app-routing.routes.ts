import { Route } from '@angular/router';


export const ROUTES: Route[] = [
  { path: '', loadComponent: () => import('./features/resume/resume-page.component').then(m => m.ResumePageComponent) },
  { path: '**', redirectTo: '' },
];

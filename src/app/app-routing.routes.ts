import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./features/portfolio/portfolio-page.component').then(
        (m) => m.PortfolioPageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];

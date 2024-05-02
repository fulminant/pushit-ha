import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'clips',
    loadComponent: () => import('./features/clips/pages/clips/clips.component')
  },
  {
    path: 'clips/:clipId',
    loadComponent: () => import('./features/clips/pages/clips/clips.component')
  },
  {
    path: '**',
    redirectTo: 'clips',
    pathMatch: 'full'
  }
];

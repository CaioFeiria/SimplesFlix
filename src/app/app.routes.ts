import { Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'movie/:id',
        component: MovieDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

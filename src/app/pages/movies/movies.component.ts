import { Component, OnInit, signal } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { SearchComponent } from '../../components/search/search.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { MovieListItem } from '../../types/movieListItem';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-movies',
  imports: [
    CommonModule,
    MovieCardComponent,
    HeaderInformationComponent,
    SearchComponent,
    RouterLink,
    CommonButtonComponent,
    FormsModule,
    BreadcrumbComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  encodeURIComponent = encodeURIComponent;
  movieController: number = 8;
  movies: MovieListItem[] = [];
  count = signal(8);

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMoviesForListPage(this.movieController);
  }

  loadMoreMovies(): void {
    const nextMovies = this.movieService.getMoreMovies(this.movieController, 8);
    this.movies = [...this.movies, ...nextMovies];
    this.movieController += 8;
  }

  filterMovies(titleMovie: string): void {
    console.log(titleMovie);
    if (!titleMovie.trim()) {
      this.movies = this.movieService.getMoviesForListPage(
        this.movieController
      );
      this.count.update((v) => (v = this.movies.length));
    } else {
      this.movies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(titleMovie.toLowerCase())
      );
      this.count.update((v) => (v = this.movies.length));
    }
  }
}

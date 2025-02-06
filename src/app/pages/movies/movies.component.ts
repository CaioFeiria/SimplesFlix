import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { SearchComponent } from '../../components/search/search.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { MovieListItem } from '../../types/movieListItem';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ObservableSearchService } from '../../service/observable-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  imports: [
    CommonModule,
    MovieCardComponent,
    RouterLink,
    HeaderInformationComponent,
    SearchComponent,
    CommonButtonComponent,
    FormsModule,
    BreadcrumbComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnDestroy {
  encodeURIComponent = encodeURIComponent;
  movieController: number = 8;
  movies: Array<MovieListItem> = [];
  moviesBackup: Array<MovieListItem> = [];
  count = signal(1);
  private subscription!: Subscription;

  constructor(
    private movieService: MovieService,
    private observerService: ObservableSearchService
  ) {}

  ngOnInit(): void {
    this.movieService.getPopularMovies('pt-BR', 1).subscribe({
      next: (res) => {
        console.log(res.results);
        this.movies = res.results;
        this.moviesBackup = res.results;
        this.count.set(res.results.length);
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.subscription = this.observerService.searched$.subscribe((value) => {
      if (!value.trim()) {
        this.movies = this.moviesBackup;
        this.count.update((v) => (v = this.movies.length));
      } else {
        this.movies = this.movies.filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        );
        this.count.update((v) => (v = this.movies.length));
      }
    });
  }

  loadMoreMovies(): void {
    // const nextMovies = this.movieService.getMoreMovies(this.movieController, 8);
    // this.movies = [...this.movies, ...nextMovies];
    // this.movieController += 8;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // filterMovies(titleMovie: string): void {
  //   console.log(titleMovie);
  //   if (!titleMovie.trim()) {
  //     this.movies = this.movieService.getMoviesForListPage(
  //       this.movieController
  //     );
  //     this.count.update((v) => (v = this.movies.length));
  //   } else {
  //     this.movies = this.movies.filter((movie) =>
  //       movie.title.toLowerCase().includes(titleMovie.toLowerCase())
  //     );
  //     this.count.update((v) => (v = this.movies.length));
  //   }
  // }
}

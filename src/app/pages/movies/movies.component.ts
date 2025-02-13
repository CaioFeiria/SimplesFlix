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
import { ObservableSearchService } from '../../service/observable-search.service';
import { LanguageSelectorService } from '../../service/language-selector.service';

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
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  encodeURIComponent = encodeURIComponent;
  movieController: number = 8;
  movies: Array<MovieListItem> = [];
  moviesBackup: Array<MovieListItem> = [];
  incrementPage: number = 1;
  codeLanguage: string = '';

  constructor(
    private movieService: MovieService,
    private observerService: ObservableSearchService,
    private languageService: LanguageSelectorService
  ) {}

  ngOnInit(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeLanguage = code;
        this.loadMovies();
      },
    });
    console.log('Init code language no movies:', this.codeLanguage);
    this.loadMovies();
    this.observerService.searched$.subscribe((value) =>
      this.filterMovies(value)
    );
  }

  loadMovies(): void {
    this.movieService
      .getPopularMovies(this.codeLanguage, this.incrementPage)
      .subscribe({
        next: (res) => {
          console.log(res.results);
          this.movies = res.results;
          this.moviesBackup = res.results;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  filterMovies(search: string): void {
    this.movies = search.trim()
      ? this.moviesBackup.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        )
      : [...this.moviesBackup];
  }

  loadMoreMovies(): void {
    this.movieService
      .getPopularMovies(this.codeLanguage, ++this.incrementPage)
      .subscribe({
        next: (res) => {
          this.moviesBackup = [...this.moviesBackup, ...res.results];
          this.movies = [...this.moviesBackup];
        },
        error: (err) => console.error(err),
      });
  }
}

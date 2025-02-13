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
import { Subject, Subscription } from 'rxjs';
import { LanguageSelectorService } from '../../service/language-selector.service';
import {
  Language,
  LanguageDetails,
  languageDetails,
} from '../../enums/language.enum';
import { LanguageSelector } from '../../components/language-selector/language-selector.component';
import { Movie } from '../../models/movie.model';

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
    LanguageSelector,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  encodeURIComponent = encodeURIComponent;
  movieController: number = 8;
  movies: Array<MovieListItem> = [];
  moviesBackup: Array<MovieListItem> = [];
  currentLanguage!: Language;
  incrementPage: number = 1;

  constructor(
    private movieService: MovieService,
    private observerService: ObservableSearchService,
    private languageService: LanguageSelectorService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getLanguage();
    this.loadMovies();
    this.observerService.searched$.subscribe((value) =>
      this.filterMovies(value)
    );
  }

  loadMovies(): void {
    this.movieService
      .getPopularMovies(this.languageService.getCode(), this.incrementPage)
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

  getCurrentLanguage(event: Language): void {
    this.currentLanguage = event;
    this.languageService.setCodeLanguage(event);
    this.loadMovies();
  }

  loadMoreMovies(): void {
    this.movieService
      .getPopularMovies(this.languageService.getCode(), ++this.incrementPage)
      .subscribe({
        next: (res) => {
          this.moviesBackup = [...this.moviesBackup, ...res.results];
          this.movies = [...this.moviesBackup];
        },
        error: (err) => console.error(err),
      });
  }
}

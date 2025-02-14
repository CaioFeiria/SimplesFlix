import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../service/movie.service';
import { MovieListItem } from '../../@types/movieListItem';
import { LanguageSelectorService } from '../../service/language-selector.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonButtonComponent,
    TranslatePipe,
    MovieCardComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  movies: MovieListItem[] = [];
  codeLanguage!: string;

  constructor(
    private movieService: MovieService,
    private languageService: LanguageSelectorService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.getCodeLang();
  }

  loadFavorites(): void {
    this.movieService.getPopularMovies(this.codeLanguage, 12).subscribe({
      next: (mov) => {
        this.movies = mov.results;
      },
    });
  }

  getCodeLang(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeLanguage = code;
        this.loadFavorites();
      },
    });
  }
}

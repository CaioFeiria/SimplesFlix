import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieListItem } from '../../@types/movieListItem';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteMovie } from '../../@types/movieFavorite';
import { MovieService } from '../../services/movie.service';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonButtonComponent,
    TranslatePipe,
    MovieCardComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  movies: MovieListItem[] = [];
  codeLanguage!: string;
  favorites: FavoriteMovie[] = [];

  constructor(
    private languageService: LanguageSelectorService,
    private favoritesService: FavoritesService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.getCodeLang();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.loadFavorites();
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

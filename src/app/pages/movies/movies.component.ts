import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { SearchComponent } from '../../components/search/search.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movies',
  imports: [
    CommonModule,
    MovieCardComponent,
    HeaderInformationComponent,
    SearchComponent,
    RouterLink,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  encodeURIComponent = encodeURIComponent;
  movieController: number = 8;
  movies: Movie[] = [];
  filteredMovies!: Movie[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.filteredMovies = this.movies;
  }

  loadMoreMovies(): void {
    this.movieController += 2;
  }

  searchedMovie(event: string): void {
    if (!event) {
      this.filteredMovies = this.movies;
    } else {
      this.filteredMovies = this.filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(event.toLowerCase())
      );
    }
    this.movieController = this.filteredMovies.length;
  }
}

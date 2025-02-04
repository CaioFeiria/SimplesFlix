import { Component, OnInit } from '@angular/core';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { CardDetailsMovieComponent } from '../../components/card-details-movie/card-details-movie.component';
import { ActivatedRoute } from '@angular/router';
import { SynopsisCardComponent } from '../../components/synopsis-card/synopsis-card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../models/movie.model';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { LoadMovie } from '../../types/loadMovie';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-movie-details',
  imports: [
    HeaderInformationComponent,
    CardDetailsMovieComponent,
    SynopsisCardComponent,
    CommonModule,
    AvatarComponent,
    CommonButtonComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: LoadMovie;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovie();
  }

  loadMovie(): void {
    const idParam = this.activatedRoute.snapshot.params['id'];
    const movie = this.movieService.getMovieById(idParam);
    if (movie) {
      this.setMovieProperties(movie);
    }
  }

  setMovieProperties(movie: Movie): void {
    this.movieDetails = {
      id: movie.id,
      title: movie.title,
      imgMovie: movie.image,
      releaseDate: movie.releaseDate,
      sinopse: movie.synopsis,
      director: movie.director,
      rating: movie.rating,
      genres: movie.genres,
      castDetails: movie.cast.map(({ actorName, character, actorImage }) => ({
        actorName,
        character,
        actorImage,
      })),
      movie: movie,
    };
    console.log(this.movieDetails.id);
  }
}

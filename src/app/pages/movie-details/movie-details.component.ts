import { Component, OnInit } from '@angular/core';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { CardDetailsMovieComponent } from '../../components/card-details-movie/card-details-movie.component';
import { ActivatedRoute } from '@angular/router';
import { SynopsisCardComponent } from '../../components/synopsis-card/synopsis-card.component';
import { MovieCastCardComponent } from '../../components/movie-cast-card/movie-cast-card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  imports: [
    HeaderInformationComponent,
    CardDetailsMovieComponent,
    SynopsisCardComponent,
    MovieCastCardComponent,
    CommonModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  imgMovie!: string;
  releaseDate!: string;
  sinopse!: string;
  director!: string;
  rating!: string;
  genres!: string[];
  title: string = '';
  castDetails!: { actorName: string; character: string; actorImage: string }[];
  movies: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MovieService
  ) {}

  ngOnInit(): void {
    const titleParam = this.route.snapshot.params['title'];
    this.title = decodeURIComponent(titleParam);
    this.movies = this.moviesService.getMovies();
    this.movies.forEach((element) => {
      if (element.title == this.title) {
        this.imgMovie = element.image;
        this.releaseDate = element.releaseDate;
        this.sinopse = element.synopsis;
        this.director = element.director;
        this.rating = element.rating;
        this.genres = element.genres;
        this.castDetails = element.cast.map((actor) => ({
          actorName: actor.actorName,
          character: actor.character,
          actorImage: actor.actorImage,
        }));
      }
    });
  }
}

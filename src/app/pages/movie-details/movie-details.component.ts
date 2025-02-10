import { Component, OnInit } from '@angular/core';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { CardDetailsMovieComponent } from '../../components/card-details-movie/card-details-movie.component';
import { ActivatedRoute } from '@angular/router';
import { SynopsisCardComponent } from '../../components/synopsis-card/synopsis-card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { LoadMovie } from '../../types/loadMovie';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { Cast } from '../../types/cast';
import { Directing } from '../../types/directing';
import { ModalContainerComponent } from '../../components/modal/modal-container/modal-container.component';
import { LanguageSelectorService } from '../../service/language-selector.service';
import { Review } from '../../types/review';
import { ReviewsApiService } from '../../service/reviews-api.service';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';

@Component({
  selector: 'app-movie-details',
  imports: [
    HeaderInformationComponent,
    CardDetailsMovieComponent,
    SynopsisCardComponent,
    CommonModule,
    CommonButtonComponent,
    BreadcrumbComponent,
    AvatarComponent,
    ModalContainerComponent,
    ReviewCardComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: LoadMovie;
  casts: Array<Cast> = [];
  outherCasts: Array<Cast> = [];
  fourFirts: Array<Cast> = [];
  director!: Directing[];
  idParam: string = '';
  exibirModal = false;
  reviews: Review[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private languageService: LanguageSelectorService,
    private reviewService: ReviewsApiService
  ) {}

  ngOnInit(): void {
    this.idParam = this.activatedRoute.snapshot.params['id'];
    this.loadMovie(this.idParam);
    this.loadReviews(this.idParam);
  }

  loadMovie(idParam: string): void {
    this.movieService
      .getMovieById(this.languageService.getCode(), idParam)
      .subscribe({
        next: (res) => {
          this.movieDetails = res;
        },
      });
    this.movieService
      .getCredtisMovieById(this.languageService.getCode(), idParam)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.cast) {
            this.fourFirts = [...res.cast.slice(0, 4)];
            for (let person of this.fourFirts) {
              this.casts.push(person);
            }
          }
          if (res.crew) {
            this.director = res.crew.filter((person: Directing) => {
              return person.job === 'Director';
            });
          }
          console.log('4 PRIMEIROS: ', this.casts);
          console.log('DIRETOR: ', this.director);
        },
      });
  }

  loadMoreCasts(): void {
    this.movieService
      .getCredtisMovieById(this.languageService.getCode(), this.idParam)
      .subscribe({
        next: (res) => {
          if (res.cast) {
            this.outherCasts = res.cast.slice(this.fourFirts.length);
          }
          console.log('TODOS OS CASTS: ', this.loadMoreCasts);
        },
      });
  }

  loadModal(): void {
    this.exibirModal = !this.exibirModal;
    console.log(this.exibirModal);
  }

  loadReviews(idParam: string): void {
    this.reviewService.getUsers().subscribe({
      next: (review) => {
        console.log('Todos reviews: ', review);
        this.reviews = review.filter((rev) => rev.movieId == Number(idParam));
        console.log('Reviews desse filme: ', this.reviews);
      },
    });
  }
}

// addStars(star: number): void {
//   for (let i = 0; i < star; i++) {
//     this.stars.push(star);
//   }

// setMovieProperties(movie: Movie): void {
//   this.movieDetails = {
//     id: movie.id,
//     title: movie.title,
//     imgMovie: movie.image,
//     releaseDate: movie.releaseDate,
//     sinopse: movie.synopsis,
//     director: movie.director,
//     rating: movie.rating,
//     genres: movie.genres,
//     castDetails: movie.cast.map(({ actorName, character, actorImage }) => ({
//       actorName,
//       character,
//       actorImage,
//     })),
//     movie: movie,
//   };
//   console.log(this.movieDetails.id);
// }

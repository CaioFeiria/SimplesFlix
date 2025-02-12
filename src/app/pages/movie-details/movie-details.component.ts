import {
  AfterViewInit,
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { CardDetailsMovieComponent } from '../../components/card-details-movie/card-details-movie.component';
import { ActivatedRoute } from '@angular/router';
import { SynopsisCardComponent } from '../../components/synopsis-card/synopsis-card.component';
import { CommonModule, DatePipe } from '@angular/common';
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swiper from 'swiper';

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
    ReactiveFormsModule,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {
  movieDetails!: LoadMovie;
  casts: Array<Cast> = [];
  outherCasts: Array<Cast> = [];
  fourFirts: Array<Cast> = [];
  director!: Directing[];
  idParam: string = '';
  exibirModal = false;
  reviews: Review[] = [];
  nameModel: string = '';
  reviewModel: string = '';
  ratingModel: string = '';
  watchedDateModel: string = '';
  formReviews!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private languageService: LanguageSelectorService,
    private reviewService: ReviewsApiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.idParam = this.activatedRoute.snapshot.params['id'];
    this.loadMovie(this.idParam);
    this.loadReviews(this.idParam);

    this.formReviews = new FormGroup({
      author: new FormControl('', [Validators.required]),
      reviewContent: new FormControl('', [Validators.minLength(5)]),
      rating: new FormControl('', [Validators.required]),
      watchedDate: new FormControl('', [Validators.required]),
      movieId: new FormControl(Number(this.idParam)),
      reviewDate: new FormControl(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      ),
      userPhoto: new FormControl('/assets/userDefault.png'),
    });
  }

  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      effect: 'cards',
      grabCursor: true,
    });
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
        },
      });
  }

  onSubmit(): void {
    this.reviewService.insertUser(this.formReviews.value).subscribe({
      next: (val) => console.log(' Form value: ', val),
    });
    this.loadReviews(this.idParam);
  }

  loadMoreCasts(): void {
    this.movieService
      .getCredtisMovieById(this.languageService.getCode(), this.idParam)
      .subscribe({
        next: (res) => {
          if (res.cast) {
            this.outherCasts = res.cast.slice(this.fourFirts.length);
          }
        },
      });
  }

  loadModal(): void {
    this.exibirModal = !this.exibirModal;
  }

  loadReviews(idParam: string): void {
    this.reviewService.getReviewsByMovie(idParam).subscribe({
      next: (val) => {
        this.reviews = val;
      },
    });
  }
}

// addStars(star: number): void {
//   for (let i = 0; i < star; i++) {
//     this.stars.push(star);
//   }

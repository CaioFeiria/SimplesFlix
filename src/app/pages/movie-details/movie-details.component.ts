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
import { EventInfoWrapper } from '@angular/core/primitives/event-dispatch';

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
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: LoadMovie;
  casts: Array<Cast> = [];
  outherCasts: Array<Cast> = [];
  fourFirts: Array<Cast> = [];
  directors!: Directing[];
  firstDirector!: Directing[];
  idParam: string = '';
  exibirModal = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.idParam = this.activatedRoute.snapshot.params['id'];
    this.loadMovie(this.idParam);
  }

  loadMovie(idParam: string): void {
    this.movieService.getMovieById('pt-BR', idParam).subscribe({
      next: (res) => {
        this.movieDetails = res;
      },
    });
    this.movieService.getCredtisMovieById('pt-BR', idParam).subscribe({
      next: (res) => {
        console.log(res);
        if (res.cast) {
          this.fourFirts = [...res.cast.slice(0, 4)];
          for (let person of this.fourFirts) {
            this.casts.push(person);
          }
        }
        if (res.crew) {
          this.directors = res.crew.filter((person: Directing) => {
            return person.known_for_department === 'Directing';
          });
          this.firstDirector = this.directors.slice(0, 1);
        }
        console.log('4 PRIMEIROS: ', this.casts);
        console.log('DIRETOR: ', this.firstDirector);
      },
    });
  }

  loadMoreCasts(): void {
    this.movieService.getCredtisMovieById('pt-BR', this.idParam).subscribe({
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
}

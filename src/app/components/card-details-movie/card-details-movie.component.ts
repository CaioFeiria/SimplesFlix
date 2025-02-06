import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { Directing } from '../../types/directing';
import { Genres } from '../../types/genres';

@Component({
  selector: 'app-card-details-movie',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './card-details-movie.component.html',
  styleUrl: './card-details-movie.component.scss',
})
export class CardDetailsMovieComponent {
  @Input() imgMovie!: string;
  @Input() releaseDate!: string;
  @Input() rating!: string;
  @Input() director!: Directing[];
  @Input() genres!: Genres[];
}

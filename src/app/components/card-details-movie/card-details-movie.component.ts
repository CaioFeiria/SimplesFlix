import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-details-movie',
  imports: [CommonModule],
  templateUrl: './card-details-movie.component.html',
  styleUrl: './card-details-movie.component.scss',
})
export class CardDetailsMovieComponent {
  @Input() imgMovie!: string;
  @Input() releaseDate!: string;
  @Input() rating!: string;
  @Input() director!: string;
  @Input() genres!: string[];
}

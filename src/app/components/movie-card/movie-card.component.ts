import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movieTitle!: string;
  @Input() releaseDate!: string;
  @Input() image!: string;
}

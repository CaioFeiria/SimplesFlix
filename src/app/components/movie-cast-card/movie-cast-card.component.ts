import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-cast-card',
  imports: [],
  templateUrl: './movie-cast-card.component.html',
  styleUrl: './movie-cast-card.component.scss',
})
export class MovieCastCardComponent {
  @Input() actorName!: string;
  @Input() personName!: string;
  @Input() actorPhoto!: string;
}

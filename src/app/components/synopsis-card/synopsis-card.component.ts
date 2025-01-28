import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-synopsis-card',
  imports: [],
  templateUrl: './synopsis-card.component.html',
  styleUrl: './synopsis-card.component.scss',
})
export class SynopsisCardComponent {
  @Input() sinopse!: string;
}

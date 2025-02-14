import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSelectorService } from '../../service/language-selector.service';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movieTitle!: string;
  @Input() releaseDate!: string;
  @Input() image!: string;
  @Input() routerLinkImg!: (string | number)[];
  codeDate!: string;

  constructor(private languageService: LanguageSelectorService) {}

  ngOnInit(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeDate = code;
      },
    });
  }
}

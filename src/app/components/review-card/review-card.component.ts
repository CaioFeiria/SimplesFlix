import { Component, Input, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { ReviewsApiService } from '../../service/reviews-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card',
  imports: [CommonModule, AvatarComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() userPhoto!: string;
  @Input() author!: string;
  @Input() reviewContent!: string;
  @Input() rating!: number;
  @Input() reviewDate!: string;
  @Input() watchedDate!: string;
  @Input() isNotEmpty: boolean = true;

  constructor(private reviewService: ReviewsApiService) {}
}

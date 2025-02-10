import { Component, Input, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { ReviewsApiService } from '../../service/reviews-api.service';
import { Review } from '../../types/review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-card',
  imports: [CommonModule, AvatarComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() userPhoto: string = '';
  @Input() author: string = '';
  @Input() reviewContent: string = '';
  @Input() rating: number = 0;
  @Input() reviewDate: string = '';
  @Input() watchedDate: string = '';

  constructor(private reviewService: ReviewsApiService) {}
}

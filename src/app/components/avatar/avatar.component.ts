import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() name!: string;
  @Input() photo!: string;
  @Input() desc?: string;
  @Input() isNameHighlighted: boolean = true;
}

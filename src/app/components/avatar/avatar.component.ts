import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageSelectorService } from '../../service/language-selector.service';
import { LanguageForApplication } from '../../types/languageApplication';

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
  @Input() photoLocal: boolean = false;
  languageApplicationCurrent!: LanguageForApplication;

  constructor(private languageService: LanguageSelectorService) {}

  ngOnInit(): void {
    this.languageApplicationCurrent =
      this.languageService.getLanguageApplication();
    console.log(this.languageApplicationCurrent);
  }
}

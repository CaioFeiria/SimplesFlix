import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { LanguageSelector } from '../language-selector/language-selector.component';
import { Language } from '../../enums/language.enum';
import { LanguageSelectorService } from '../../service/language-selector.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SideBarComponent,
    BreadcrumbComponent,
    LanguageSelector,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  currentLanguage!: Language;

  constructor(private languageService: LanguageSelectorService) {}

  getCurrentLanguage(event: Language): void {
    this.currentLanguage = event;
    this.languageService.setCodeLanguage(event);
  }
}

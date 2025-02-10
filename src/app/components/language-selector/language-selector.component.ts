import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Language,
  LanguageDetails,
  languageDetails,
} from '../../enums/language.enum';
import { LanguageSelectorService } from '../../service/language-selector.service';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelector implements OnInit {
  languageActive!: string;
  flag!: string;
  @Output() languageSelect = new EventEmitter<Language>();
  languageEnum = Language;
  languageDetailsEnum = languageDetails;
  codeLanguage!: string;
  currentLanguage: Language;

  constructor(private languageService: LanguageSelectorService) {
    this.codeLanguage = this.languageService.getCode();
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.languageActive = languageDetails[this.currentLanguage].description;
    this.flag = languageDetails[this.currentLanguage].flag;
    console.log('LANG COMPONENT: ', this.codeLanguage);
  }

  loadLanguage(): void {
    this.languageActive = languageDetails[this.currentLanguage].description;
    this.flag = languageDetails[this.currentLanguage].flag;
  }

  returnLanguage(value: Language): void {
    this.flag = languageDetails[value].flag;
    this.languageActive = languageDetails[value].description;
    this.languageSelect.emit(value);
  }
}

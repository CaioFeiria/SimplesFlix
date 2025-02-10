import { Injectable, OnInit } from '@angular/core';
import { Language, languageDetails } from '../enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageSelectorService {
  languageCurrent: Language = Language.Portuguese;

  constructor() {}

  getDescription(language: Language): string {
    return languageDetails[language].description;
  }

  getCode(): string {
    return languageDetails[this.languageCurrent].code;
  }

  setCodeLanguage(language: Language): void {
    this.languageCurrent = language ? language : this.languageCurrent;
    console.log('set SELECT LANGUAGE: ', languageDetails[language].code);
  }

  getLanguage(): Language {
    console.log('get SELECT LANGUAGE: ', this.languageCurrent);
    return this.languageCurrent;
  }

  setLanguage(language: Language): void {
    this.languageCurrent = language;
  }
}

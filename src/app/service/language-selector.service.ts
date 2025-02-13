import { Injectable } from '@angular/core';
import {
  Language,
  LanguageDetails,
  languageDetails,
} from '../enums/language.enum';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageSelectorService {
  private language$: BehaviorSubject<LanguageDetails>;
  private languageCurrent: Language;

  constructor() {
    this.languageCurrent = Language.Portuguese; // Definir o valor inicial
    this.language$ = new BehaviorSubject<LanguageDetails>(
      languageDetails[this.languageCurrent]
    );
  }

  // Retorna a descrição da linguagem
  getDescription(language: Language): string {
    return languageDetails[language].description;
  }

  // Retorna o código da linguagem como um Observable
  getCode(): Observable<string> {
    return this.getLanguage().pipe(map((lang) => lang.code));
  }

  // Altera a linguagem atual
  setLanguage(language: Language): void {
    if (language) {
      this.languageCurrent = language;
      this.language$.next(languageDetails[language]);
    }
  }

  // Retorna o idioma atual
  getLanguageCurrent(): LanguageDetails {
    return languageDetails[this.languageCurrent];
  }

  // Retorna o Observable da linguagem atual
  getLanguage(): Observable<LanguageDetails> {
    return this.language$.asObservable();
  }

  // Define a linguagem a partir do código
  setCodeLanguage(language: Language): void {
    this.setLanguage(language);
  }
}

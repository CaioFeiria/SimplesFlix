import { Injectable } from '@angular/core';
import { Language, languageDetails } from '../enums/language.enum';
import { LanguageForApplication } from '../types/languageApplication';

@Injectable({
  providedIn: 'root',
})
export class LanguageSelectorService {
  languageCurrent: Language = Language.Portuguese;

  languagesApplication: { [key in Language]: LanguageForApplication } = {
    [Language.Portuguese]: {
      user: 'Stevezinho224',
      startPage: 'Início',
      moviesPage: 'Filmes',
      settings: 'Configurações',
      exit: 'Sair',
      movieTitle: 'Haha',
      labelQtdSearched: 'filme(s) encontrado(s)',
    },
    [Language.English]: {
      user: 'Stevezinho224',
      startPage: 'Home',
      moviesPage: 'Movies',
      settings: 'Settings',
      exit: 'Leave',
      movieTitle: 'Haha',
      labelQtdSearched: 'found movie(s)',
    },
    [Language.Russian]: {
      user: 'Стевесиньо224',
      startPage: 'Начинать',
      moviesPage: 'Фильмы',
      settings: 'Настройки',
      exit: 'Чтобы выйти',
      movieTitle: 'Haha',
      labelQtdSearched: 'Фильм(ы) найден',
    },
    [Language.Japan]: {
      user: 'スティーブジーニョ224',
      startPage: '始める',
      moviesPage: '映画',
      settings: '設定',
      exit: '外出する',
      movieTitle: 'Haha',
      labelQtdSearched: 'フィルムが見つかりました',
    },
  };

  constructor() {}

  getLanguageApplication(): LanguageForApplication {
    return this.languagesApplication[this.languageCurrent];
  }

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

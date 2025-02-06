import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableSearchService {
  constructor() {}

  searched$ = new Subject<string>();

  outputSearchedValue(value: string): void {
    console.log(value);
    this.searched$.next(value);
  }
}

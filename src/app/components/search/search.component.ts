import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  search: string = '';

  searchTermSubject = new Subject<string>();
  searchTerm$ = this.searchTermSubject.asObservable();

  // @Output() searched = new EventEmitter<string>();

  // searchChanges(): void {
  //   this.searched.emit(this.search);
  // }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  search: string = '';
  @Input() numMovies!: number;
  @Output() searched = new EventEmitter<string>();

  searchChanges(): void {
    this.searched.emit(this.search);
  }
}

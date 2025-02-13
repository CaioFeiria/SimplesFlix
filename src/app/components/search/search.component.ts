import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ObservableSearchService } from '../../service/observable-search.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  search: string = '';

  constructor(private observerService: ObservableSearchService) {}

  searched(): void {
    this.observerService.outputSearchedValue(this.search);
  }
}

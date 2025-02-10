import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../types/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsApiService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}`);
  }

  insertUser(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, { ...review });
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  constructor(private activatedRoute: ActivatedRoute) {}
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDatailsComponent } from './movie-details.component';

describe('MovieDatailsComponent', () => {
  let component: MovieDatailsComponent;
  let fixture: ComponentFixture<MovieDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDatailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

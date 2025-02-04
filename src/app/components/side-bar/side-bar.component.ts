import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive, AvatarComponent, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  constructor(private router: Router) {}

  isMoviesActive(): boolean {
    return this.router.url.startsWith('/movie');
  }
}

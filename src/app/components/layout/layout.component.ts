import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { LanguageSelector } from '../language-selector/language-selector.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SideBarComponent,
    LanguageSelector,
    BreadcrumbComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // isMobile: boolean = false;
  // constructor(private breakpointObserver: BreakpointObserver) {}
  // ngOnInit() {
  //   this.breakpointObserver
  //     .observe([Breakpoints.Handset])
  //     .subscribe((result) => {
  //       this.isMobile = result.matches;
  //     });
  // }
}

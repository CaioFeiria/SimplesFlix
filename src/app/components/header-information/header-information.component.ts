import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RoutesPath } from '../../types/routesPath';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-information',
  imports: [CommonModule],
  templateUrl: './header-information.component.html',
  styleUrl: './header-information.component.scss',
})
export class HeaderInformationComponent {
  @Input() movieTitle!: string;
  @Input() routes!: RoutesPath[];
}

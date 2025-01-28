import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-information',
  imports: [],
  templateUrl: './header-information.component.html',
  styleUrl: './header-information.component.scss',
})
export class HeaderInformationComponent {
  @Input() movieTitle!: string | null;
  @Input() previous!: string;
  @Input() current!: string;
}

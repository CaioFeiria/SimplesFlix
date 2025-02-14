import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SimplesFlix';

  public currentLang = 'pt-BR';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt-BR', 'en-US', 'ru', 'ja']);
    this.translate.setDefaultLang('pt-BR');
  }
}

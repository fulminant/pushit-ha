import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';
import { ThemeService } from './shared/services/theme.service';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    const theme = this.themeService.getTheme();
    this.themeService.setThemeMode(theme);
  }
}

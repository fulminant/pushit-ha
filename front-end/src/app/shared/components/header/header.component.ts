import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { SwitchThemeComponent } from '../switch-theme-button/switch-theme.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SwitchThemeComponent
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public darkModeFC = this.formBuilder.control(true);

  private unsubscribe$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    const theme = this.themeService.getTheme();

    this.darkModeFC.patchValue(theme !== 'dark')

    this.darkModeFC.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.themeService.setTheme(val ? 'light' : 'dark');
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}

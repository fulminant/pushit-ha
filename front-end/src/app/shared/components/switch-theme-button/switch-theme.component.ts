import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchThemeComponent),
      multi: true
    }
  ]
})
export class SwitchThemeComponent implements OnInit, OnDestroy {
  public switchFC = this.formBuilder.control(false);
  public isDisabled = false;

  private unsubscribe$ = new Subject();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange = (m: any) => {};

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.switchFC.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => this.onChange(value));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.switchFC.patchValue(value, { emitEvent: false, onlySelf: true });
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;

    if (isDisabled) {
      this.switchFC.disable();
    } else {
      this.switchFC.enable();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}

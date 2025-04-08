import {ControlValueAccessor} from '@angular/forms';
import {noop} from 'rxjs/util/noop';

export class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: T) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
